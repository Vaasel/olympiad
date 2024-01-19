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

//Getting All sports for Reg Team
const allSports = async (req, res) => {
  try {
    const sports = await prisma.competitions.findMany({});
    if (!sports || sports.length === 0) {
      return res.apiError("No sports found", "Not Found", 404);
    }
    res.apiSuccess(sports);
  } catch (error) {
    res.apiError(error.message, "Internal Server Error", 500);
  }
};

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
        competitions: {
          include: {
            competition: true,
          },
        },
      },
    });

    if (!user) {
      return res.apiError("User not found", "Not Found", 404);
    }

    const userSportIds = user.competitions.map(
      (competition) => competition.competition.competitionId
    );

    const allSports = await prisma.competitions.findMany({
      where: {
        minPlayer: 1,
        maxPlayer: 1,
      },
    });

    const sportsWithHasApplied = allSports.map((competition) => ({
      ...competition,
      hasApplied: userSportIds.includes(competition.id),
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
        competitions: {
          include: {
            competition: true,
          },
        },
      },
    });

    if (!user) {
      return res.apiError("User not found", "Not Found", 404);
    }

    const userSportIds = user.competitions.map(
      (sport) => sport.competition.competitionId
    );

    const sportsWithMinAndMaxPlayers = await prisma.competitions.findMany({
      where: {
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
        ? user.competitions.find(
            (us) => us.competition.competitionId === sport.id
          )?.competition.code || null
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
    return res.status(400).json({ error: "Invalid request", message: validationError.message });
  }

  try {
    const { sportId } = req.body;

    const [sport, user, team] = await Promise.all([
      prisma.competitions.findUnique({
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
      prisma.competitions_Teams.findFirst({
        where: {
          userId,
          competitionId: sportId,
        },
      }),
    ]);

    // Validate sport existence
    if (!sport) {
      return res.status(404).json({ error: "Sport not found" });
    }

    // Validate if the sport is for single players
    if (sport.minPlayer !== 1 && sport.maxPlayer !== 1) {
      return res.status(404).json({ error: "Not for single players." });
    }

    // Validate if the user is already in the team
    if (team) {
      return res.status(500).json({ error: "You are already in the team." });
    }
    
    const hashedId = await bcrypt.hash(user.email, 10);

    const createdSportTeam = await prisma.competitions_Teams.create({
      data: {
        name: sport.name + user.name + hashedId,
        userId,
        competitionId: sportId,
        challanId: 1,
      },
    });

    await prisma.competitions_Teams_Members.create({
      data: {
        competitionsTeamId: createdSportTeam.id,
        userId: req.user.id,
      },
    });

    res.apiSuccess("Joined sport team successfully");
  } catch (error) {
    console.error(error);
    res.apiError("Failed to join sport team", 500);
  }
};



const createTeam = async (req, res) => {
  const userId = req.user.id;

  const idSchema = yup.number().required().positive().integer();
  try {
    await idSchema.validate(userId);
  } catch (validationError) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const { sportId, teamName } = req.body;

    const [sport, user] = await Promise.all([
      prisma.competitions.findUnique({
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

    if (!sport) {
      return res.status(404).json({ error: "Sport not found" });
    }

    if (sport.minPlayer === 1 && sport.maxPlayer === 1) {
      return res.status(400).json({ error: "Not for single players" });
    }

    // Validate if the sport is suitable for the user's gender
    if (user.basicInfo.gender !== sport.gender) {
      return res.status(400).json({ error: "Not for your gender" });
    }

    const [team, teamMembers, codes] = await Promise.all([
      prisma.competitions_Teams.findFirst({
        where: {
          userId: user.id,
          competitionId: sportId,
        },
      }),
      prisma.competitions_Teams_Members.findMany({
        where: {
          userId: user.id,
        },
        include: {
          competition: true,
        },
      }),
      prisma.competitions_Teams.findMany({
        select: {
          code: true,
        },
      }),
    ]);

    if (team) {
      return res.status(400).json({ error: "You are already in a team" });
    }

    for (const member of teamMembers) {
      if (member.competition.competitionId === sportId) {
        return res.status(400).json({ error: "You are already in a team" });
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
        loopExit = codeList.includes(code);
      } while (loopExit);
    }

    const createdSportTeam = await prisma.competitions_Teams.create({
      data: {
        name: teamName,
        userId,
        competitionId: sportId,
        challanId: 1,
        code,
      },
    });

    await prisma.competitions_Teams_Members.create({
      data: {
        competitionsTeamId: createdSportTeam.id,
        userId: req.user.id,
      },
    });

    res.apiSuccess("Created sport team successfully");
  } catch (error) {
    console.error(error);
    res.apiError("Failed to create sport team", 500);
  }
};


const joinTeam = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.id;

    // Validate code and user ID
    if (!code) {
      return res.apiError("Code is required.", 'Invalid Code', 500);
    }

    if (!userId) {
      return res.apiError("User ID is required.", 'Invalid User ID', 500);
    }

    const [sportsTeam, user] = await Promise.all([
      prisma.competitions_Teams.findFirst({
        where: {
          code,
        },
        include: {
          competition: true,
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
      return res.apiError("Failed to join sport team.", 'Invalid Code', 500);
    }

    // if (user.basicInfo.gender !== sportsTeam.competition.gender) {
    //   return res.apiError("Not for your gender.", 'Not Found', 404);
    // }

    const teamMembersCount = await prisma.competitions_Teams_Members.count({
      where: {
        competitionsTeamId: parseInt(sportsTeam.id),
      },
    });

    if (teamMembersCount >= sportsTeam.competition.maxPlayer) {
      return res.apiError("Failed to join team because it exceeds limit.", 'Internal Server Error', 500);
    }

    const teamMember = await prisma.competitions_Teams_Members.findFirst({
      where: {
        userId: user.id,
        competitionsTeamId: sportsTeam.id,
      },
    });

    if (teamMember) {
      return res.apiError("You are already in the team.", 'Internal Server Error', 500);
    }

    await prisma.competitions_Teams_Members.create({
      data: {
        competitionsTeamId: sportsTeam.id,
        userId: req.user.id,
      },
    });

    res.apiSuccess("Joined sport team successfully");
  } catch (error) {
    console.error("Error joining sport team:", error);
    res.apiError(
      "Failed to join sport team. Please check logs for details.",
      500
    );
  }
};

const getMembers = async (req, res) => {
  const { sportId } = req.params;
  const userId = req.user.id;

  try {
    if (!sportId) {
      return res.status(400).json({ error: "Sport ID is required." });
    }

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const sport = await prisma.competitions.findUnique({
      where: {
        id: parseInt(sportId),
      },
    });

    if (!sport) {
      return res.status(404).json({ error: "Sport not found." });
    }

    let sportDetails = sport;

    if (sport.minPlayer !== 1 || sport.maxPlayer !== 1) {
      const userTeam = await prisma.competitions_Teams.findFirst({
        where: {
          competitionId: parseInt(sportId),
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
        const teamMembers = userTeam.members
          .filter((member) => member.userId !== userId) // Exclude the user
          .map((member) => member.user);

        sportDetails = {
          ...sportDetails,
          teamMembers,
        };
      }
    }

    res.apiSuccess(sportDetails);
  } catch (error) {
    console.error("Error fetching sport members:", error);
    res.apiError("Failed to fetch sport members.", 500);
  }
};
const addSport = async (req, res) => {
  const { name, description, minPlayer, maxPlayer, price, gender, teamCap } =
    req.body;

  try {
    if (!name || !description || !minPlayer || !maxPlayer || !price || !gender || !teamCap) {
      return res.apiError("Missing required fields.", "Bad Request", 400);
    }

    // Use Prisma to create a new sport in the database
    const newSport = await prisma.competitions.create({
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

    res.apiSuccess({ sport: newSport });
  } catch (error) {
    console.error("Error adding a new sport:", error);
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

    // Check if there's a challan associated with the sport and user in sports_teams
    const sportsTeam = await prisma.competitions_Teams.findFirst({
      where: {
        competitionId: parseInt(sportId),
        userId: userId,
      },
    });

    if (sportsTeam) {
      // If the challanId is not 1, check isPaid from challan table
      if (sportsTeam.challanId !== 1) {
        const challan = await prisma.challan.findUnique({
          where: {
            id: sportsTeam.challanId,
          },
        });

        if (challan.isPaid === "verified") {
          return res.apiSuccess({
            message: "Challan has been paid. You cannot leave the game.",
          });
        }
      }

      await prisma.competitions_Teams_Members.deleteMany({
        where: {
          competitionsTeamId: sportsTeam.id,
        },
      });

      await prisma.competitions_Teams.delete({
        where: {
          id: sportsTeam.id,
        },
      });

      return res.apiSuccess({
        message: "You have successfully withdrawn from the game.",
      });
    } else {
      return res.apiError("You are not part of this game.", 404);
    }
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

    // Check if there's a team associated with the provided sportsTeamId and user
    const sportsTeam = await prisma.competitions_Teams.findFirst({
      where: {
        id: parseInt(sportsTeamId),
        userId: userId,
      },
    });

    if (sportsTeam) {
      const userChallanCount = await prisma.challan.count({
        where: {
          userId: user,
        },
      });

      if (userChallanCount > 0) {
        return res.apiError("Unable to delete this user.", 403);
      }

      await prisma.competitions_Teams_Members.deleteMany({
        where: {
          competitionsTeamId: sportsTeamId,
          userId: user,
        },
      });

      return res.apiSuccess({
        message: "You have successfully withdrawn from the game.",
      });
    } else {
      return res.apiError("You are not part of this game.", 404);
    }
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
};
