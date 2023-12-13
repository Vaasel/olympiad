const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

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
    const sports = await prisma.sports.findMany({});
    res.apiSuccess(sports);
  } catch (error) {
    res.apiError(error.message, 'Internal Server Error', 500);
  }
};

//Just single player sports
const genderSingleSports = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
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
    res.apiError(error.message, 'Internal Server Error', 500);
  }
};

const genderTeamSports = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
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
    res.apiError(error.message, 'Internal Server Error', 500);
  }
};

const applyIndividualSport = async (req, res) => {
  const userId = req.user.id;
  try {
    const { sportId } = req.body;

    // Check if the sportId exists
    const sport = await prisma.sports.findUnique({
      where: {
        id: sportId,
      },
    });

    if (!sport) {
      return res.apiError("Sport not found", 'Not Found', 404);
    }

    if (sport.minPlayer !== 1 && sport.maxPlayer !== 1) {
      return res.apiError("Not for single players.", 'Not Found', 404);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        basicInfo: true,
      },
    });

    if (user.basicInfo.gender !== sport.gender) {
      return res.apiError("Not for your gender.", 'Not Found', 404);
    }

    const team = await prisma.sports_Teams.findFirst({
      where: {
        userId,
        sportsId: sportId,
      },
    });

    if (team) {
      return res.apiError("You are already in the team.", 'Internal Server Error', 500);
    }

    const hashedId = await bcrypt.hash(user.email, 10);

    const createdSportTeam = await prisma.sports_Teams.create({
      data: {
        name: sport.name + user.name + hashedId, // Or any relevant data
        userId,
        sportsId: sportId,
        challanId: 1,
      },
    });

    // Create an entry in Sports_Teams_Members for the user
    await prisma.sports_Teams_Members.create({
      data: {
        sportsTeamId: createdSportTeam.id,
        userId: req.user.id,
      },
    });

    res.apiSuccess("Joined sport team successfully");
  } catch (error) {
    res.apiError("Failed to join sport team", 'Internal Server Error', 500);
  }
};


const createTeam = async (req, res) => {
  const userId = req.user.id;
  try {
    const { sportId, teamName } = req.body;

    // Check if the sportId exists
    const sport = await prisma.sports.findUnique({
      where: {
        id: sportId,
      },
    });

    if (!sport) {
      return res.apiError("Sport not found", 'Not Found', 404);
    }

    if (sport.minPlayer === 1 && sport.maxPlayer === 1) {
      return res.apiError("Not for single players.", 'Not Found', 404);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        basicInfo: true,
      },
    });

    if (user.basicInfo.gender !== sport.gender) {
      return res.apiError("Not for your gender.", 'Not Found', 404);
    }

    const team = await prisma.sports_Teams.findFirst({
      where: {
        userId: user.id,
        sportsId: sportId,
      },
    });

    if (team) {
      return res.apiError("You are already in the team.", 'Internal Server Error', 500);
    }

    const teamMember = await prisma.sports_Teams_Members.findMany({
      where: {
        userId: user.id,
      },
      include: {
        sport: true,
      },
    });

    for (const member of teamMember) {
      if (member.sport.sportsId === sportId) {
        return res.apiError("You are already in the team.", 'Internal Server Error', 500);
      }
    }

    const codes = await prisma.sports_Teams.findMany({
      select: {
        code: true,
      },
    });

    const codeList = codes.map((team) => team.code);
    let code;

    let loopExit = false;

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
    res.apiError("Failed to create sport team", 'Internal Server Error', 500);
  }
};

const joinTeam = async (req, res) => {
  try {
    const { code } = req.body;
    const user = req.user;

    const sportsTeam = await prisma.sports_Teams.findFirst({
      where: {
        code,
      },
      include: {
        sport: true,
      },
    });

    if (!sportsTeam) {
      return res.apiError("Failed to join sport team.", 'Internal Server Error', 500);
    }

    const teamMembersCount = await prisma.sports_Teams_Members.count({
      where: {
        sportsTeamId: parseInt(sportsTeam.id),
      },
    });

    if (teamMembersCount >= sportsTeam.sport.maxPlayer) {
      return res.apiError("Failed to join team because it exceeds limit.", 'Internal Server Error', 500);
    }

    const teamMember = await prisma.sports_Teams_Members.findFirst({
      where: {
        userId: user.id,
        sportsTeamId: sportsTeam.id,
      },
    });

    if (teamMember) {
      return res.apiError("You are already in the team.", 'Internal Server Error', 500);
    }

    await prisma.sports_Teams_Members.create({
      data: {
        sportsTeamId: sportsTeam.id,
        userId: req.user.id,
      },
    });

    res.apiSuccess("Joined sport team successfully");
  } catch (error) {
    res.apiError("Failed to join sport team", 'Internal Server Error', 500);
  }
};

const getMembers = async (req, res) => {
  const { sportId } = req.params;
  const userId = req.user.id; // Assuming the user ID is available in req.user

  try {
    const sport = await prisma.sports.findUnique({
      where: {
        id: parseInt(sportId),
      },
    });

    if (!sport) {
      return res.apiError("Sport not found.", 'Not Found', 404);
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

    res.apiSuccess({ success: true, sportDetails });
  } catch (error) {
    res.apiError("Failed to fetch sport members", 'Internal Server Error', 500);
  }
};

const addSport = async (req, res) => {
  const { name, description, minPlayer, maxPlayer, price, gender, teamCap } = req.body;

  try {
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
    res.apiError("Failed to add a new sport", 'Internal Server Error', 500);
  }
};

const withdrawSingleSport = async (req, res) => {
  const { sportId } = req.body;
  const userId = req.user.id;

  try {
    const sportsTeam = await prisma.sports_Teams.findFirst({
      where: {
        sportsId: parseInt(sportId),
        userId: userId,
      },
    });

    if (!sportsTeam) {
      return res.apiError("You are not part of this game.", 'Not Found', 404);
    }

    if (sportsTeam.challanId !== 1) {
      const challan = await prisma.challan.findUnique({
        where: {
          id: sportsTeam.challanId,
        },
      });

      if (challan && challan.isPaid === "verified") {
        return res.apiError("Challan has been paid. You cannot leave the game.", 'Bad Request', 400);
      }
    }

    // Delete records in sports_Teams_Members table first
    await prisma.sports_Teams_Members.deleteMany({
      where: {
        sportsTeamId: sportsTeam.id,
      },
    });

    // Then delete the sportsTeam record
    await prisma.sports_Teams.delete({
      where: {
        id: sportsTeam.id,
      },
    });

    return res.apiSuccess("You have successfully withdrawn from the game.");
  } catch (error) {
    console.error("Error withdrawing sport:", error);
    res.apiError("Failed to withdraw sport.", 'Internal Server Error', 500);
  }
};



const withdrawTeamSport = async (req, res) => {
  const { sportsTeamId, user } = req.body;
  const userId = req.user.id;

  try {
    const sportsTeam = await prisma.sports_Teams.findFirst({
      where: {
        id: parseInt(sportsTeamId),
        userId: userId,
      },
    });

    if (!sportsTeam) {
      return res.apiError("You are not part of this game.", 'Not Found', 404);
    }

    const userChallanCount = await prisma.challan.count({
      where: {
        userId: user,
      },
    });

    if (userChallanCount > 0) {
      return res.apiError("You cannot delete this user.", 'Bad Request', 400);
    }

    await prisma.sports_Teams_Members.deleteMany({
      where: {
        sportsTeamId: sportsTeamId,
        userId: user,
      },
    });

    return res.apiSuccess("You have successfully withdrawn from the game.");
  } catch (error) {
    console.error("Error withdrawing sport:", error);
    res.apiError("Failed to withdraw sport.", 'Internal Server Error', 500);
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
