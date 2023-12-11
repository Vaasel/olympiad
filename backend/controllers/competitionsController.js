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
    const sports = await prisma.competitions.findMany({});
    res.status(200).json({ success: true, message: sports });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
        competitions: {
          include: {
            competition: true,
          },
        },
      },
    });

    // const gender = user.basicInfo.gender;
    const userSportIds = user.competitions.map(
      (competition) => competition.competition.competitionId
    );

    const allSports = await prisma.competitions.findMany({
      where: {
        gender: false,
        minPlayer: 1,
        maxPlayer: 1,
      },
    });

    const sportsWithHasApplied = allSports.map((competition) => ({
      ...competition,
      hasApplied: userSportIds.includes(competition.id),
    }));

    res.status(200).json({ success: true, message: sportsWithHasApplied });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
        competitions: {
          include: {
            competition: true,
          },
        },
      },
    });

    // const gender = user.basicInfo.gender;
    const userSportIds = user.competitions.map((sport) => sport.sport.sportsId);

    const sportsWithMinAndMaxPlayers = await prisma.sports.findMany({
      where: {
        gender: true,
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

    res.status(200).json({ success: true, message: sportsWithCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const applyIndividualSport = async (req, res) => {
  const userId = req.user.id;
  try {
    const { sportId } = req.body;

    // Check if the sportId exists
    const sport = await prisma.competitions.findUnique({
      where: {
        id: sportId,
      },
    });

    if (!sport) {
      return res.status(404).json({ error: "Sport not found" });
    }

    if (sport.minPlayer !== 1 && sport.maxPlayer !== 1) {
      return res.status(404).json({ error: "Not for single players." });
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
      return res.status(404).json({ error: "Not for your gender." });
    }

    const team = await prisma.competitions_Teams.findFirst({
      where: {
        userId,
        competitionId: sportId,
      },
    });

    if (team) {
      return res.status(500).json({ error: "You are already in the team." });
    }

    const hashedId = await bcrypt.hash(user.email, 10);

    const createdSportTeam = await prisma.competitions_Teams.create({
      data: {
        name: sport.name + user.name + hashedId, // Or any relevant data
        userId, // Assuming req.user.id holds the user's ID
        competitionId: sportId,
        challanId: 1,
      },
    });

    // Create an entry in Sports_Teams_Members for the user
    await prisma.competitions_Teams_Members.create({
      data: {
        competitionsTeamId: createdSportTeam.id,
        userId: req.user.id,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "Joined sport team successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to join sport team" });
  }
};

const createTeam = async (req, res) => {
  const userId = req.user.id;
  try {
    const { sportId, teamName } = req.body;

    // Check if the sportId exists
    const sport = await prisma.competitions.findUnique({
      where: {
        id: sportId,
      },
    });

    if (!sport) {
      return res.status(404).json({ error: "Sport not found" });
    }

    if (sport.minPlayer === 1 && sport.maxPlayer === 1) {
      return res.status(404).json({ error: "Not for single players." });
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
      return res.status(404).json({ error: "Not for your gender." });
    }

    const team = await prisma.competitions_Teams.findFirst({
      where: {
        userId: user.id,
        competitionId: sportId,
      },
    });

    if (team) {
      return res.status(500).json({ error: "You are already in the team." });
    }

    const teamMember = await prisma.competitions_Teams_Members.findMany({
      where: {
        userId: user.id,
      },
      include: {
        competition: true,
      },
    });

    for (const member of teamMember) {
      if (member.competition.competitionId === sportId) {
        return res.status(500).json({ error: "You are already in the team." });
      }
    }

    const codes = await prisma.competitions_Teams.findMany({
      select: {
        code: true,
      },
    });

    const codeList = codes.map((team) => team.code);

    var code;
    var loopExit = false;

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

    const createdSportTeam = await prisma.competitions_Teams.create({
      data: {
        name: teamName, // Or any relevant data
        userId, // Assuming req.user.id holds the user's ID
        competitionId: sportId,
        challanId: 1,
        code,
      },
    });

    // Create an entry in Sports_Teams_Members for the user
    await prisma.competitions_Teams_Members.create({
      data: {
        competitionsTeamId: createdSportTeam.id,
        userId: req.user.id,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "Created sport team successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create sport team" });
  }
};

const joinTeam = async (req, res) => {
  try {
    const { code } = req.body;
    const user = req.user;

    const sportsTeam = await prisma.competitions_Teams.findFirst({
      where: {
        code,
      },
      include: {
        competition: true,
      },
    });

    if (!sportsTeam) {
      return res.status(404).json({ error: "Sport team not found." });
    }

    const teamMembersCount = await prisma.competitions_Teams_Members.count({
      where: {
        competitionsTeamId: parseInt(sportsTeam.id),
      },
    });

    if (teamMembersCount >= sportsTeam.competition.maxPlayer) {
      return res.status(500).json({ error: "Team is full." });
    }

    const teamMember = await prisma.competitions_Teams_Members.findFirst({
      where: {
        userId: user.id,
        competitionsTeamId: sportsTeam.id,
      },
    });

    if (teamMember) {
      return res.status(500).json({ error: "You are already in the team." });
    }

    await prisma.competitions_Teams_Members.create({
      data: {
        competitionsTeamId: sportsTeam.id,
        userId: req.user.id,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "Joined sport team successfully" });
  } catch (error) {
    console.error("Error joining sport team:", error);
    res.status(500).json({
      error: "Failed to join sport team. Please check logs for details.",
    });
  }
};

const getMembers = async (req, res) => {
  const { sportId } = req.params;
  const userId = req.user.id; // Assuming the user ID is available in req.user

  try {
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

    res.status(200).json({ success: true, sportDetails });
  } catch (error) {
    console.error("Error fetching sport members:", error);
    res.status(500).json({ error: "Failed to fetch sport members." });
  }
};



const addSport = async (req, res) => {
  const { name, description, minPlayer, maxPlayer, price, gender, teamCap } =
    req.body;

  try {
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

    res.status(201).json({ success: true, sport: newSport });
  } catch (error) {
    console.error("Error adding a new sport:", error);
    res.status(500).json({ error: "Failed to add a new sport." });
  }
};


const withdrawSingleSport = async (req, res) => {
  const { sportId } = req.body;
  const userId = req.user.id;

  try {
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
          return res.status(200).json({
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

      return res
        .status(200)
        .json({ message: "You have successfully withdrawn from the game." });
    } else {
      return res
        .status(404)
        .json({ message: "You are not part of this game." });
    }
  } catch (error) {
    console.error("Error withdrawing sport:", error);
    res.status(500).json({ error: "Failed to withdraw sport." });
  }
};





const withdrawTeamSport = async (req, res) => {
  const { sportsTeamId, user } = req.body;
  const userId = req.user.id;

  try {
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
        return res.status(403).json({ error: "Unable to delete this user." });
      }

      await prisma.competitions_Teams_Members.deleteMany({
        where: {
          competitionsTeamId: sportsTeamId,
          userId: user,
        },
      });

      return res
        .status(200)
        .json({ message: "You have successfully withdrawn from the game." });
    } else {
      return res
        .status(404)
        .json({ message: "You are not part of this game." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to withdraw sport." });
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
