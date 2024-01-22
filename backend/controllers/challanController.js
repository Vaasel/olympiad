const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const yup = require("yup");
require("yup-password")(yup);
const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();
const { validateToken } = require("../middlewares/auth");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // Store the file buffer in memory
const { transporter } = require("../utils/mailer");
const { uploadToWasabi, getSingleImage } = require("../middlewares/wasabi");

const prisma = new PrismaClient();

module.exports.getAllFAQs = async (req, res) => {
  try {
    const faqs = await prisma.FAQ.findMany();

    if (!faqs || faqs.length === 0) {
      console.error("No FAQs found");
      return res.apiError(null, "No FAQs found", 404);
    }

    res.apiSuccess(faqs);
  } catch (error) {
    console.error(error);
    res.apiError(error.message, "Internal Server Error", 500);
  }
};

module.exports.CreateFAQ = async (req, res) => {
  const { question, answer, category } = req.body;
  try {
    // Validate input fields
    if (!question || !answer || !category) {
      res.apiError(null, "Question, answer, and category are required", 400);
      return;
    }

    // Create a new FAQ entry
    const newFAQ = await prisma.fAQ.create({
      data: {
        question,
        answer,
        category,
      },
    });
    res.apiSuccess(newFAQ);
  } catch (error) {
    console.error(error);
    res.apiError(error.message, "Internal Server Error", 500);
  }
};

module.exports.getAllChallans = async (req, res) => {
  try {
    const Challans = await prisma.Challan.findMany({
      where: {
        NOT: {
          id: 1,
        },
      },
      include: {
        user: true,
      },
    });

    if (!Challans || Challans.length === 0) {
      return res.apiError("Error", "No Challans found", 404);
    }

    res.apiSuccess(Challans);
  } catch (err) {
    res.apiError(err.message, "Internal Server Error", 500);
  }
};

module.exports.getUserChallans = async (req, res) => {
  try {
    const Challans = await prisma.Challan.findMany({
      where: {
        userId: req.user.id,
      },
    });

    // Check if Challans is null or empty before proceeding
    if (!Challans || Challans.length === 0) {
      console.error("No Challans found for the user");
      res.apiError("Failed", "No Challans found for the user", 404);
      return;
    }

    // Create an array of promises for fetching images
    Challans.map((challan) => {
		challan.detail = JSON.parse(challan.detail);
    });
	  Challans.sort((a, b) => a.id - b.id);
    Challans[Challans.length - 1].paymentProof = await getSingleImage(Challans[Challans.length - 1].paymentProof);




    res.apiSuccess(Challans);
  } catch (err) {
    console.error("Error retrieving user Challans:", err);
    res.apiError("Internal Server Error", err.message, 500);
  }
};

module.exports.updateChallan = async (req, res) => {
  try {
    // Use upload middleware to handle file upload
    upload.fields([{ name: "paymentProof", maxCount: 1 }])(
      req,
      res,
      async (err) => {
        if (err) {
          return res.apiError(err.message, "File upload error", 400);
        }

        const paymentProofFile = req.files["paymentProof"]
          ? req.files["paymentProof"][0]
          : null;

        if (!paymentProofFile) {
          return res.apiError(null, "Payment proof is required.", 400);
        }

        // Validate file buffer length
        if (paymentProofFile.buffer.length === 0) {
          return res.apiError(null, "Invalid file buffer", 400);
        }

        // Upload the file to Wasabi
        const paymentProofLink = await uploadToWasabi(paymentProofFile);

        // Extract challanId from the request body
        const { challanId } = req.body;

        // Validate challanId
        if (!challanId) {
          return res.apiError(null, "Challan ID is required.", 400);
        }

        let updatedChallan;
        try {
          // Update the corresponding Challan record in the database
          updatedChallan = await prisma.Challan.update({
            where: {
              id: parseInt(challanId),
              userId: req.user.id,
            },
            data: {
              paymentProof: paymentProofLink,
              isPaid: "pending",
            },
          });
        } catch (error) {
          if (error.code === "P2025") {
            console.error(
              "Challan not found with the specified ID:",
              challanId
            );
            return res.apiError(null, "Challan not found.", 404);
          } else {
            return res.apiError(error.message, "Challan not updated.", 500);
          }
        }
        // Respond with the updated Challan record
        return res.apiSuccess(updatedChallan);
      }
    );
  } catch (error) {
    // Handle other errors and log them
    console.error(error);
    return res.apiError(error.message, "Internal Server Error", 500);
  }
};

module.exports.setStatus = async (req, res) => {
  const data = req.body;

  const validationSchema = yup.object().shape({
    userId: yup.number().integer().required(),
    id: yup.number().integer().required(),
    reason: yup.string().trim().required(),
    isPaid: yup.string().trim().required(),
  });  

  try {
    await validationSchema.validate(req.body, {
      abortEarly: false,
      strict: true,
    });
  } catch (err) {
    console.error("Validation Error:", err.errors);
    return res.apiError(err.errors, "Validation Error", 400);
  }

  // const id = data.userId;
  // const entry = await prisma.BasicInfo.findUnique({
  //   where: { userId: data.userId},
  // });

  // Assuming data is an object with properties userId and id
  let user;
  let updatedStatusChallan;
  
  try {
    [user, updatedStatusChallan] = await Promise.all([
      prisma.user.findUnique({
        where: {
          id: data.userId,
        },
      }),
      
      prisma.Challan.update({
        where: { id: data.id },
        data: {
          isPaid: data.isPaid,
        },
      }),
    ]);
  } catch (error) {
    // console.error('Error finding user or updating Challan:', error);
  
    // Handle the error accordingly, for example, send a response to the client
    return res.apiError(null, 'Internal Server Error', 500);
  }

  let mailOptions;

  if (data.isPaid == "verified") {
    mailOptions = {
      from: "info.olympiad@nust.edu.pk",
      to: user.email, // Email address you want to send the email to
      subject: "Payment Confirmation - Olympiad'24 Participation",
      html: `<div><h3>Dear ${user.name},<h2/>
          <p>We're pleased to confirm the successful processing of your payment for Olympiad'24 participation. Your commitment is sincerely appreciated, and we're thrilled to welcome you aboard.</p>
          <p>To stay informed about upcoming events, expect additional details to be sent to this email address. Please keep an eye on your inbox for these updates.</p>
          <p>For any immediate questions or concerns, our dedicated support team is at your service.</p>
          <p>Thank you once again for choosing to be a part of Olympiad'24 and reigniting the torch!</p>
          <p>Best regards,</p>
		  <p>Olympiad Team</p>
		  </div>`,
    };
  } else {
    mailOptions = {
      from: "info.olympiad@nust.edu.pk",
      to: user.email, // Email address you want to send the email to
      subject: "NUST Olympiad'24 Challan Payment Status",
      html: `<div><h2>Dear Participant,</h2>
      <p>We acknowledge your prompt response in submitting your challan payment form for the upcoming NUST Olympiad'24. After a thorough review, we regret to inform you that an issue has been identified with your payment, preventing further processing. This can be attributed to incomplete information or inaccuracies during the challan documentation process.</p>
      <p>We understand the potential disappointment and sincerely apologize for any inconvenience. To expedite the resolution, we request that you review the details in your challan payment form and rectify any errors or omissions. Once corrected, please promptly resubmit the updated form.</p>
      <p>Should you have any queries or require assistance during this process, please do not hesitate to contact <a href="mailto:info.olympiad@nust.edu.pk">info.olympiad@nust.edu.pk</a>.</p>
      <p>We greatly appreciate your cooperation as we work towards ensuring a seamless experience for all participants. Thank you for your keen interest in NUST Olympiad'24, and we look forward to your continued participation.</p>
      <h3>Reason:</h3>
      <p>${data.reason}</p>
      <p>Best Regards</p>
	  <p>Olympiad Team</p>
	  </div>`,
    };
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.apiError(null, "Error sending email", 500);
    } else {
      console.log("Email sent: " + info.response);
      // res.apiSuccess(null, "Email sent successfully");
    }
  });

  res.apiSuccess(updatedStatusChallan, "Challan updated successfully");
};

module.exports.CalculateChallan = async (req, res) => {
  try {
    const userId = req.user.id;

    const [user, sportsTeams, competitionTeams] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        include: { challan: true, basicInfo: true },
      }),
      prisma.sports_Teams.findMany({
        where: {
          userId: userId,
          challanId: 1,
        },
        include: {
          sport: true,
        },
      }),
      prisma.competitions_Teams.findMany({
        where: {
          userId: userId,
          challanId: 1,
        },
        include: {
          competition: true,
        },
      }),
    ]);

    // Check if user, sportsTeams, and competitionTeams are null or undefined
    if (!user || !sportsTeams || !competitionTeams) {
      console.error();
      return res.apiError(
        null,
        "Error fetching user, sportsTeams, or competitionTeams",
        500
      );
    }

    const totalSportsPrice = sportsTeams.reduce((acc, sportsTeam) => {
      return acc + (sportsTeam.sport.price || 0);
    }, 0);

    const totalCompetitionsPrice = competitionTeams.reduce(
      (acc, competitionTeam) => {
        return acc + (competitionTeam.competition.price || 0);
      },
      0
    );

    let totalPrice = totalSportsPrice + totalCompetitionsPrice;

    if (totalPrice === 0) {
      return res.apiError("No sport/competition selected");
    }

    const getTeamPrices = (teams) =>
      teams.map((team) => ({
        id: team.sport.id,
        name: team.sport.name,
        price: team.sport.price,
        isIndividual: team.sport.minPlayer == 1 && team.sport.maxPlayer == 1,
      }));
    const getCompTeamPrices = (teams) =>
      teams.map((team) => ({
        id: team.competition.id,
        name: team.competition.name,
        price: team.competition.price,
        isIndividual:
          team.competition.minPlayer == 1 && team.competition.maxPlayer == 1,
      }));

    const sportsPrices = getTeamPrices(sportsTeams);
    const competitionPrices = getCompTeamPrices(competitionTeams);

    const details = [...sportsPrices, ...competitionPrices];
    if (user && user.challan.length === 0) {
      const registrationPrice =
        user.basicInfo && user.basicInfo.studentOf === "nust" ? 500 : 1000;
      const social = user.basicInfo.socials;
      const socialPrice =
        social !== "nosocials"
          ? social !== "all"
            ? social === "concert"
              ? 1000
              : 500
            : 1500
          : 0;
      totalPrice += registrationPrice + socialPrice;
      details.push({
        id: 0,
        name: "Registration",
        price: { base: registrationPrice, social: socialPrice },
        isIndividual: false,
      });
    }
    return res.apiSuccess({
      userId: userId,
      totalSportsPrice: totalSportsPrice,
      totalCompetitionsPrice: totalCompetitionsPrice,
      totalPrice: totalPrice,
      details: details,
    });
  } catch (error) {
    return res.apiError(null, err.message, 500);
    // res.status(500).send("Internal Server Error");
  }
};

module.exports.CreateChallan = async (req, res) => {
  try {
    const userId = req.user.id;

    const idSchema = yup.number().required().positive().integer();
    try {
      await idSchema.validate(userId);
    } catch (validationError) {
      return res.apiError("Invalid request", validationError.message, 400);
    }

    const [user, sportsTeams, competitionTeams] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        include: { challan: true, basicInfo: true },
      }),
      prisma.sports_Teams.findMany({
        where: {
          userId: userId,
          challanId: 1,
        },
        include: {
          sport: true,
        },
      }),
      prisma.competitions_Teams.findMany({
        where: {
          userId: userId,
          challanId: 1,
        },
        include: {
          competition: true,
        },
      }),
    ]);

    // Check if user, sportsTeams, and competitionTeams are null or undefined
    if (!user || !sportsTeams || !competitionTeams) {
      return res.apiError(
        "Error fetching user, sportsTeams, or competitionTeams",
        "Internal Server Error",
        500
      );
    }

    const totalSportsPrice = sportsTeams.reduce((acc, sportsTeam) => {
      return acc + (sportsTeam.sport.price || 0);
    }, 0);

    const totalCompetitionsPrice = competitionTeams.reduce(
      (acc, competitionTeam) => {
        return acc + (competitionTeam.competition.price || 0);
      },
      0
    );

    let netTotal = totalSportsPrice + totalCompetitionsPrice;

    if (netTotal === 0) {
      return res.apiError("No challan generated", "failed", 400);
    }

    const getTeamPrices = (teams) =>
      teams.map((team) => ({
        id: team.sport.id,
        name: team.sport.name,
        price: team.sport.price,
        isIndividual: team.sport.minPlayer == 1 && team.sport.maxPlayer == 1,
      }));
    const getCompTeamPrices = (teams) =>
      teams.map((team) => ({
        id: team.competition.id,
        name: team.competition.name,
        price: team.competition.price,
        isIndividual:
          team.competition.minPlayer == 1 && team.competition.maxPlayer == 1,
      }));

    const sportsPrices = getTeamPrices(sportsTeams);
    const competitionPrices = getCompTeamPrices(competitionTeams);

    const details = [...sportsPrices, ...competitionPrices];
    if (user && user.challan.length === 0) {
      const registrationPrice =
        user.basicInfo && user.basicInfo.studentOf === "nust" ? 500 : 1000;
      const social = user.basicInfo.socials;
      const socialPrice =
        social !== "nosocials"
          ? social !== "all"
            ? social === "concert"
              ? 1000
              : 500
            : 1500
          : 0;
      netTotal += registrationPrice + socialPrice;
      details.push({
        id: 0,
        name: "Registration",
        price: { base: registrationPrice, social: socialPrice },
        isIndividual: false,
      });
    }

    upload.fields([{ name: "paymentProof", maxCount: 1 }])(
      req,
      res,
      async (err) => {
        if (err) {
          return res.apiError(err.message, "File upload error", 400);
        }

        const paymentProofFile = req.files["paymentProof"]
          ? req.files["paymentProof"][0]
          : null;

        if (!paymentProofFile) {
          return res.apiError(null, "Payment proof is required.", 400);
        }

        if (paymentProofFile.buffer.length === 0) {
          return res.apiError(null, "Invalid file buffer", 400);
        }

        let paymentProofLink;
        try {
          paymentProofLink = await uploadToWasabi(paymentProofFile);
        } catch (uploadError) {
          return res.apiError(uploadError.message, "File upload error", 500);
        }

        let createdChallan;
        try {
          createdChallan = await prisma.challan.create({
            data: {
              userId: userId,
              detail: JSON.stringify(details) || null,
              netTotal: netTotal,
              paymentProof: paymentProofLink,
            },
          });
        } catch (challanError) {
          return res.apiError(
            challanError.message,
            "Challan creation error",
            500
          );
        }
		  createdChallan.detail = details;
        const updateSportsTeamsPromises = sportsTeams.map(async (team) => {
          await prisma.sports_Teams.update({
            where: {
              id: team.id,
            },
            data: {
              challanId: createdChallan.id,
            },
          });
        });

        const updateCompetitionTeamsPromises = competitionTeams.map(
          async (team) => {
            await prisma.competitions_Teams.update({
              where: {
                id: team.id,
              },
              data: {
                challanId: createdChallan.id,
              },
            });
          }
        );

        // Wait for all promises to resolve
        await Promise.all([
          ...updateSportsTeamsPromises,
          ...updateCompetitionTeamsPromises,
        ]);

        return res.apiSuccess({
          userId: userId,
          totalSportsPrice: totalSportsPrice,
          totalCompetitionsPrice: totalCompetitionsPrice,
          netTotal: netTotal,
          challan: createdChallan,
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res.apiError(error.message, "Internal Server Error", 500);
  }
};


module.exports.getChallan = async (req, res) => {
  try {
    const { id } = req.params;

    const idSchema = yup.number().required().positive().integer();
    try {
      await idSchema.validate(id);
    } catch (validationError) {
      return res.apiError("Invalid request", validationError.message, 400);
    }

    const Challans = await prisma.Challan.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        user: true,
      },
    });

    if (!Challans) {
      return res.apiError(
        "Challan not found",
        `Challan with ID ${idNumber} does not exist`,
        404
      );
    }

    const base64Image = await getSingleImage(Challans.paymentProof);
    Challans.paymentProof = base64Image;
	Challans.detail = JSON.parse(Challans.detail);

    return res.apiSuccess(Challans);
  } catch (err) {
    return res.apiError(err.message, "Internal Server Error", 500);
  }
};
