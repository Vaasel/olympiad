//withdrawTeamSports --> Captain can't leave unless there are no members left.

//If payment has been done, then withdrawing is not allowed
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const yup = require("yup");
function generateUniqueCode() {
  const length = 6;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}

const SportsTeamIndividual = async (req, res) => {
  try {
    const { sportId } = req.params;

    const sport = await prisma.sports.findUnique({
      where: {
        id: parseInt(sportId),
      },
    });

    if (!sport) {
      return res.apiError("Not Found", "Sport not found", 404);
    }

    if (sport.minPlayer !== 1 || sport.maxPlayer !== 1) {
      return res.apiError("Invalid Request", "Not an individual sport", 400);
    }

    const teamMembers = await prisma.sports_Teams.findMany({
      where: {
        sportsId: parseInt(sportId),
      },
      select: {
        userId: true,
        challanId: true,
      },
    });

    const memberIds = teamMembers.map((member) => member.userId);

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: memberIds,
        },
      },
      select: {
        id: true,
        name: true,
        basicInfo: {
          select: {
            cnic: true,
            phoneno: true,
          },
        },
      },
    });

    const formattedMembers = [];

    for (const user of users) {
      const member = {
        id: user.id,
        name: user.name,
        cnic: user.basicInfo.cnic,
        phoneno: user.basicInfo.phoneno,
      };

      const challan = await prisma.challan.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (!challan) {
        member.registrationFees = false;
        
      } else {
        member.registrationFees = true;
      }

      formattedMembers.push(member);
    }

    const response = {
      sportName: sport.name,
      isIndividual: true,
      members: formattedMembers,
    };

    res.apiSuccess(response);
  } catch (err) {
    res.apiError(err.message, "Failed", 500);
  }
};

const SportsTeamMembers = async (req, res) => {
  try {
    const sportsId = parseInt(req.params.sportId);

    // Fetch sport details
    const sport = await prisma.sports.findUnique({
      where: {
        id: sportsId,
      },
    });

    if (!sport) {
      return res.status(404).json({ error: 'Sport not found' });
    }

    const sportName = sport.name;
    const isIndividual = sport.minPlayer === 1 && sport.maxPlayer === 1 ? true : false;

    // Fetch teams for the given sport
    const teams = await prisma.sports_Teams.findMany({
      where: {
        sportsId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            basicInfo: {
              select: {
                cnic: true,
                phoneno: true,
              },
            },
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                basicInfo: {
                  select: {
                    cnic: true,
                    phoneno: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Format the response
    const response = {
      sport: sportName,
      sportid: sportsId,
      IsIndividual: isIndividual,
      teams: teams.map(team => ({
        team_name: team.name,
        isChallanPaid: team.challanId !== 1, // If challanId is 1, make it false, otherwise true
        members: team.members.map(member => ({
          name: member.user.name,
          userid: member.user.id,
          cnic: member.user.basicInfo.cnic,
          phone_number: member.user.basicInfo.phoneno,
          isFeePaid: false, // Initially assuming fee is not paid, will check and update later
        })),
      })),
    };

    // Loop through teams to check if fee is paid by at least one member
    for (const team of response.teams) {
      for (const member of team.members) {
        // Check if there's a challan against this member's userId
        const challan = await prisma.challan.findFirst({
          where: {
            userId: member.userid,
          },
        });

        // If challan exists, update isFeePaid to true
        if (challan) {
          member.isFeePaid = true;
          break; // No need to check further members once fee is paid for one
        }
      }
    }

    // Send the response
    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Getting All sports for Reg Team
const allSports = async (req, res) => {
  try {
    const sports = await prisma.sports.findMany({});

    if (!sports || sports.length === 0) {
      return res.apiError("No sports found", "Not Found", 404);
    }

    res.apiSuccess(sports);
  } catch (error) {
    console.error(error);
    res.apiError(error.message, "Internal Server Error", 500);
  }
};

//Just single player sports
const genderSingleSports = async (req, res) => {
  try {
    const userId = req.user.id;

    const idSchema = yup.number().required().positive().integer();
    try {
      await idSchema.validate(userId);
    } catch (validationError) {
      return res.apiError("Invalid request", validationError.message, 400);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        basicInfo: true,
        sports: {
          include: {
            sport: true,
          },
        },
      },
    });

    if (!user) {
      return res.apiError("User not found", "Not Found", 404);
    }

    const gender = user.basicInfo.gender;
    const userSportIds = user.sports.map((sport) => sport.sport.sportsId);

    const allSports = await prisma.sports.findMany({
      where: {
        gender,
        minPlayer: 1,
        maxPlayer: 1,
      },
    });

    const sportsWithHasApplied = allSports.map((sport) => ({
      ...sport,
      hasApplied: userSportIds.includes(sport.id),
    }));

    res.apiSuccess(sportsWithHasApplied);
  } catch (error) {
    console.error(error);
    res.apiError(error.message, "Internal Server Error", 500);
  }
};

const genderTeamSports = async (req, res) => {
  try {
    const userId = req.user.id;

    const idSchema = yup.number().required().positive().integer();
    try {
      await idSchema.validate(userId);
    } catch (validationError) {
      return res.apiError("Invalid request", validationError.message, 400);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        basicInfo: true,
        sports: {
          include: {
            sport: true,
          },
        },
      },
    });

    if (!user) {
      return res.apiError("User not found", "Not Found", 404);
    }

    const gender = user.basicInfo.gender;
    const userSportIds = user.sports.map((sport) => sport.sport.sportsId);

    const sportsWithMinAndMaxPlayers = await prisma.sports.findMany({
      where: {
        gender,
        NOT: {
          AND: [{ minPlayer: 1 }, { maxPlayer: 1 }],
        },
      },
    });

    const sportsWithHasApplied = sportsWithMinAndMaxPlayers.map((sport) => ({
      ...sport,
      hasApplied: userSportIds.includes(sport.id),
    }));

    const sportsWithCode = sportsWithHasApplied.map((sport) => ({
      ...sport,
      code: sport.hasApplied
        ? user.sports.find((us) => us.sport.sportsId === sport.id)?.sport
            .code || null
        : null,
    }));

    res.apiSuccess(sportsWithCode);
  } catch (error) {
    console.error(error);
    res.apiError(error.message, "Internal Server Error", 500);
  }
};

const applyIndividualSport = async (req, res) => {
  const userId = req.user.id;

  const idSchema = yup.number().required().positive().integer();
  try {
    await idSchema.validate(userId);
  } catch (validationError) {
    return res.apiError("Invalid request", validationError.message, 400);
  }

  try {
    const { sportId } = req.body;

    const [sport, user, team] = await Promise.all([
      prisma.sports.findUnique({
        where: {
          id: sportId,
        },
      }),
      prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          basicInfo: true,
        },
      }),
      prisma.sports_Teams.findFirst({
        where: {
          userId,
          sportsId: sportId,
        },
      }),
    ]);

    // Validate sport existence
    if (!sport) {
      return res.apiError("Sport not found", "Not Found", 404);
    }

    // Validate if the sport is for single players
    if (!(sport.minPlayer === 1 && sport.maxPlayer === 1)) {
      return res.apiError("Not for single players", "Bad Request", 400);
    }

    // Validate if the sport is suitable for the user's gender
    if (user.basicInfo.gender !== sport.gender) {
      return res.apiError("Not for your gender", "Bad Request", 400);
    }

    // Validate if the user is already in the team
    if (team) {
      return res.apiError("You are already in the sport", "Bad Request", 400);
    }

    const hashedId = await bcrypt.hash(user.email, 10);

    const createdSportTeam = await prisma.sports_Teams.create({
      data: {
        name: sport.name + user.name + hashedId,
        userId,
        sportsId: sportId,
        challanId: 1,
      },
    });

    await prisma.sports_Teams_Members.create({
      data: {
        sportsTeamId: createdSportTeam.id,
        userId: req.user.id,
      },
    });

    res.apiSuccess("Joined sport team successfully");
  } catch (error) {
    console.error(error);
    res.apiError("Failed to join sport team", "Internal Server Error", 500);
  }
};

const createTeam = async (req, res) => {
  const userId = req.user.id;
  try {
    const { sportId, teamName } = req.body;

    // Check if the sportId exists
    const [sport, user] = await Promise.all([
      prisma.sports.findUnique({
        where: {
          id: sportId,
        },
      }),
      prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          basicInfo: true,
        },
      }),
    ]);

    // Validate sport existence
    if (!sport) {
      return res.apiError("Sport not found", "Not Found", 404);
    }

    // Validate if the sport is for single players
    if (sport.minPlayer === 1 && sport.maxPlayer === 1) {
      return res.apiError("Only for single players.", "Not Found", 404);
    }

    // Validate if the sport is suitable for the user's gender
    if (user.basicInfo.gender !== sport.gender) {
      return res.apiError("Not for your gender.", "Not Found", 404);
    }

    const [team, teamMembers, codes] = await Promise.all([
      prisma.sports_Teams.findFirst({
        where: {
          userId: user.id,
          sportsId: sportId,
        },
      }),
      prisma.sports_Teams_Members.findMany({
        where: {
          userId: user.id,
        },
        include: {
          sport: true,
        },
      }),
      prisma.sports_Teams.findMany({
        select: {
          code: true,
        },
      }),
    ]);

    // Check if the user is already in a team
    if (team) {
      return res.apiError(
        "You are already in the team.",
        "Internal Server Error",
        409
      );
    }

    // Check if the user is already in a team based on membership
    for (const member of teamMembers) {
      if (member.sport.sportsId === sportId) {
        return res.apiError(
          "You are already in the team.",
          "Internal Server Error",
          409
        );
      }
    }

    const codeList = codes.map((team) => team.code);
    let code;

    let loopExit = false;

    if (codeList.length === 0) {
      loopExit = true;
      code = generateUniqueCode();
    } else {
      codeList.forEach((item) => {
        if (!item) {
          loopExit = true;
          return;
        }
      });

      do {
        code = generateUniqueCode();
        loopExit = code.includes(codeList);
      } while (loopExit);
    }

    const createdSportTeam = await prisma.sports_Teams.create({
      data: {
        name: teamName,
        userId,
        sportsId: sportId,
        challanId: 1,
        code,
      },
    });

    // Create an entry in Sports_Teams_Members for the user
    await prisma.sports_Teams_Members.create({
      data: {
        sportsTeamId: createdSportTeam.id,
        userId: req.user.id,
      },
    });

    res.apiSuccess("Created sport team successfully");
  } catch (error) {
    console.error(error);
    res.apiError("Failed to create sport team", "Internal Server Error", 500);
  }
};

const joinTeam = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.id;

    // Validate code and user ID
    if (!code) {
      return res.status(400).json({ error: "Code is required." });
    }

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const [sportsTeam, user] = await Promise.all([
      prisma.sports_Teams.findFirst({
        where: {
          code,
        },
        include: {
          sport: true,
        },
      }),
      prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          basicInfo: true,
        },
      }),
    ]);

    if (!sportsTeam) {
      return res.status(404).json({ error: "Sports team not found." });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.basicInfo.gender !== sportsTeam.sport.gender) {
      return res.apiError("Not for your gender.", "Not Found", 404);
    }

    const teamMembersCount = await prisma.sports_Teams_Members.count({
      where: {
        sportsTeamId: parseInt(sportsTeam.id),
      },
    });

    if (teamMembersCount >= sportsTeam.sport.maxPlayer) {
      return res.apiError(
        "Failed to join team because it exceeds the limit.",
        "Internal Server Error",
        500
      );
    }

    const teamMember = await prisma.sports_Teams_Members.findFirst({
      where: {
        userId: user.id,
        sportsTeamId: sportsTeam.id,
      },
    });

    if (teamMember) {
      return res.apiError(
        "You are already in the team.",
        "Internal Server Error",
        500
      );
    }

    await prisma.sports_Teams_Members.create({
      data: {
        sportsTeamId: sportsTeam.id,
        userId: req.user.id,
      },
    });

    res.apiSuccess("Joined sport team successfully");
  } catch (error) {
    console.error(error);
    res.apiError("Failed to join sport team", "Internal Server Error", 500);
  }
};
const getMembers = async (req, res) => {
  const { sportId } = req.params;
  const userId = req.user.id;

  try {
    if (!sportId) {
      return res.apiError("Sport ID is required.", "Bad Request", 400);
    }

    if (!userId) {
      return res.apiError("User ID is required.", "Bad Request", 400);
    }

    const sport = await prisma.sports.findUnique({
      where: {
        id: parseInt(sportId),
      },
    });

    if (!sport) {
      return res.apiError("Sport not found.", "Not Found", 404);
    }

    let sportDetails = sport;

    if (sport.minPlayer !== 1 || sport.maxPlayer !== 1) {
      const userTeam = await prisma.sports_Teams.findFirst({
        where: {
          sportsId: parseInt(sportId),
          members: {
            some: {
              userId: userId,
            },
          },
        },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });

      if (userTeam) {
        const capId = userTeam.userId;
        const teamMembers = userTeam.members
          // .filter((member) => member.userId !== userId) // Exclude the user
          .map((member) => {
            member.user.id === capId ? member.user.isCap = true : member.user.isCap = false;
            return member.user;
          });

        sportDetails = {
          ...sportDetails,
          teamMembers,
        };
      }
    }

    res.apiSuccess(sportDetails);
  } catch (error) {
    res.apiError(
      "Failed to fetch sport members.",
      "Internal Server Error",
      500
    );
  }
};

const addSport = async (req, res) => {
  const { name, description, minPlayer, maxPlayer, price, gender, teamCap } = req.body;
  try {
    if (
      !name ||
      !description ||
      !minPlayer ||
      !maxPlayer ||
      !price ||
      !gender ||
      !teamCap
    ) {
      return res.apiError("Missing required fields.", "Bad Request", 400);
    }

    // Use Prisma to create a new sport in the database
    const newSport = await prisma.sports.create({
      data: {
        name,
        description,
        minPlayer,
        maxPlayer,
        teamCap,
        price,
        gender,
      },
    });

    res.apiSuccess({ success: true, sport: newSport });
  } catch (error) {
    res.apiError("Failed to add a new sport.", "Internal Server Error", 500);
  }
};
const withdrawSingleSport = async (req, res) => {
  const { sportId } = req.body;
  const userId = req.user.id;

  try {
    if (!sportId) {
      return res.apiError("Sport ID is required.", "Bad Request", 400);
    }

    if (!userId) {
      return res.apiError("User ID is required.", "Bad Request", 400);
    }

    const sportsTeam = await prisma.sports_Teams.findFirst({
      where: {
        sportsId: parseInt(sportId),
        userId: userId,
      },
    });

    if (!sportsTeam) {
      return res.apiError("You are not part of this game.", "Not Found", 404);
    }

    if (sportsTeam.challanId !== 1) {
      const challan = await prisma.challan.findUnique({
        where: {
          id: sportsTeam.challanId,
        },
      });

      if (challan && challan.isPaid === "verified") {
        return res.apiError(
          "Challan has been paid. You cannot leave the game.",
          "Bad Request",
          400
        );
      }
    }

    await prisma.sports_Teams_Members.deleteMany({
      where: {
        sportsTeamId: sportsTeam.id,
      },
    });

    await prisma.sports_Teams.delete({
      where: {
        id: sportsTeam.id,
      },
    });

    return res.apiSuccess("You have successfully withdrawn from the game.");
  } catch (error) {
    console.error("Error withdrawing sport:", error);
    res.apiError("Failed to withdraw sport.", "Internal Server Error", 500);
  }
};

const withdrawTeamSport = async (req, res) => {
  const { sportsTeamId, user } = req.body;
  const userId = req.user.id;

  try {
    if (!sportsTeamId) {
      return res.apiError("Sports team ID is required.", "Bad Request", 400);
    }

    if (!user) {
      return res.apiError("User ID is required.", "Bad Request", 400);
    }

    console.log(req.body);

    const [sportsTeam, userChallanCount] = await Promise.all([
      prisma.sports_Teams.findFirst({
        where: {
          id: parseInt(sportsTeamId),
          userId: userId,
        },
      }),
      prisma.challan.count({
        where: {
          userId: user,
        },
      }),
    ]);

    console.log(sportsTeam);
    
    if (!sportsTeam) {
      return res.apiError("You are not part of this game.", "Not Found", 404);
    }
    

    if (userChallanCount > 0) {
      return res.apiError("You cannot delete this user.", "Bad Request", 400);
    }

    await prisma.sports_Teams_Members.deleteMany({
      where: {
        sportsTeamId: sportsTeamId,
        userId: user,
      },
    });

    // await prisma.sports_Teams.delete({
    //   where: {
    //     sportsTeamId: sportsTeamId,
    //     // userId: user,
    //   },
    // });

    return res.apiSuccess("You have successfully withdrawn from the game.");
  } catch (error) {
    console.error("Error withdrawing sport:", error);
    res.apiError("Failed to withdraw sport.", "Internal Server Error", 500);
  }
};

module.exports = {
  allSports,
  genderSingleSports,
  genderTeamSports,
  applyIndividualSport,
  createTeam,
  joinTeam,
  getMembers,
  addSport,
  withdrawSingleSport,
  withdrawTeamSport,
  SportsTeamMembers,
  SportsTeamIndividual
};
