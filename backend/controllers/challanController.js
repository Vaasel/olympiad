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
    res.apiSuccess(faqs);
  } catch (error) {
    console.error(error);
    res.apiError(error.message, "Internal Server Error", 500);
  }
};

module.exports.CreateFAQ = async (req, res) => {
  const { question, answer, category } = req.body;
  try {
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
    for (const challan of Challans) {
      challan.paymentProof = await getSingleImage(challan.paymentProof);
    }
    res.apiSuccess(Challans);
  } catch (err) {
    res.apiError(err.message, "Internal Server Error", 500);
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

        // Update the corresponding Challan record in the database
        const updatedChallan = await prisma.Challan.update({
          where: {
            id: parseInt(challanId),
            userId: req.user.id,
          },
          data: {
            paymentProof: paymentProofLink,
            isPaid: "pending",
          },
        });

        // Respond with the updated Challan record
        return res.apiSuccess(updatedChallan);
      }
    );
  } catch (err) {
    // Handle other errors and log them
    console.error(err);
    return res.apiError(err.message, "Internal Server Error", 500);
  }
};

module.exports.setStatus = async (req, res) => {
  const data = req.body;

  console.log(data.userId);
  const id = data.userId;
  // const entry = await prisma.BasicInfo.findUnique({
  //   where: { userId: data.userId},
  // });

  const user = await prisma.user.findUnique({
    where: {
      id: data.userId,
    },
  });

  const updatedStatusChallan = await prisma.Challan.update({
    where: { id: data.id },
    data: {
      isPaid: data.isPaid,
    },
  });

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
          <p>Best regards,</p></div>`,
    };    
  }else{
     mailOptions = {
      from: "info.olympiad@nust.edu.pk",
      to: user.email, // Email address you want to send the email to
      subject: "NUST Olympiad'24 Challan Payment Status",
      html: `<div><h2>Dear Participant,</h2>
      <p>We acknowledge your prompt response in submitting your challan payment form for the upcoming NUST Olympiad'24. After a thorough review, we regret to inform you that an issue has been identified with your payment, preventing further processing. This can be attributed to incomplete information or inaccuracies during the challan documentation process.</p>
      <p>We understand the potential disappointment and sincerely apologize for any inconvenience. To expedite the resolution, we request that you review the details in your challan payment form and rectify any errors or omissions. Once corrected, please promptly resubmit the updated form.</p>
      <p>Should you have any queries or require assistance during this process, please do not hesitate to contact [Olympiad helpline].</p>
      <p>We greatly appreciate your cooperation as we work towards ensuring a seamless experience for all participants. Thank you for your keen interest in NUST Olympiad'24, and we look forward to your continued participation.</p>
      <h3>Reason:</h3>
      <p>${data.reason}</p>
      <p>Best Regards</p></div>`,
    };  
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully");
    }
  });

  res.apiSuccess(updatedStatusChallan, "Challan updated successfully");
};

module.exports.CalculateChallan = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { challan: true, basicInfo: true },
    });
    const sportsTeams = await prisma.sports_Teams.findMany({
      where: {
        userId: userId,
        challanId: 1,
      },
      include: {
        sport: true,
      },
    });

    const competitionTeams = await prisma.competitions_Teams.findMany({
      where: {
        userId: userId,
        challanId: 1,
      },
      include: {
        competition: true,
      },
    });

    const totalSportsPrice = sportsTeams.reduce((acc, sportsTeam) => {
      return acc + (sportsTeam.sport.price || 0);
    }, 0);

    const totalCompetitionsPrice = competitionTeams.reduce(
      (acc, competitionTeam) => {
        return acc + (competitionTeam.sport.price || 0);
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

    const sportsPrices = getTeamPrices(sportsTeams);
    const competitionPrices = getTeamPrices(competitionTeams);

    const details = [...sportsPrices, ...competitionPrices];
    if (user && user.challan.length === 0) {
      const registrationPrice =
        user.basicInfo && user.basicInfo.studentOf === "nust" ? 500 : 1000;
        const social =user.basicInfo.socials;
        const socialPrice = social !== 'nosocials'
        ? social !== 'all'
          ? social === 'concert'
            ? 1000
            : 500
          : 1500
        : 0;          
        totalPrice += registrationPrice+socialPrice;
      details.push({
        id: 0,
        name: "Registration",
        price: {base:registrationPrice,social:socialPrice},
        isIndividual: false,
      });
    }
    res.apiSuccess({
      userId: userId,
      totalSportsPrice: totalSportsPrice,
      totalCompetitionsPrice: totalCompetitionsPrice,
      totalPrice: totalPrice,
      details: details,
    });
  } catch (error) {
    console.error(error);
    res.apiError(error.message, "Internal Server Error", 500);
  }
};

module.exports.CreateChallan = async (req, res) => {
  try {
    upload.fields([{ name: "paymentProof", maxCount: 1 }])(
      req,
      res,
      async (err) => {
        if (err) {
          res.apiError(err.message, "File upload error", 400);
          return;
        }
        const userId = req.user.id;
        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: { challan: true, basicInfo: true },
        });
        const paymentProofFile = req.files["paymentProof"]
          ? req.files["paymentProof"][0]
          : null;

        if (!paymentProofFile) {
          res.apiError(null, "Payment proof is required.", 400);
          return;
        }

        // try {
        if (paymentProofFile.buffer.length === 0) {
          res.apiError(null, "Invalid file buffer", 400);
          return;
        }

        const paymentProofLink = await uploadToWasabi(paymentProofFile);

        // Calculate total amount for sports teams
        const sportsTeams = await prisma.sports_Teams.findMany({
          where: {
            userId: userId,
            challanId: 1,
          },
          include: {
            sport: true,
          },
        });

        const totalSportsPrice = sportsTeams.reduce((acc, sportsTeam) => {
          return acc + (sportsTeam.sport.price || 0);
        }, 0);

        // Calculate total amount for competition teams
        const competitionTeams = await prisma.competitions_Teams.findMany({
          where: {
            userId: userId,
            challanId: 1,
          },
          include: {
            competition: true,
          },
        });

        const totalCompetitionsPrice = competitionTeams.reduce(
          (acc, competitionTeam) => {
            return acc + (competitionTeam.sport.price || 0);
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
            isIndividual:
              team.sport.minPlayer == 1 && team.sport.maxPlayer == 1,
          }));

        const sportsPrices = getTeamPrices(sportsTeams);
        const competitionPrices = getTeamPrices(competitionTeams);

        const details = [...sportsPrices, ...competitionPrices];
        if (user && user.challan.length === 0) {
          const registrationPrice =
            user.basicInfo && user.basicInfo.studentOf === "nust" ? 500 : 1000;
            const social =user.basicInfo.socials;
            const socialPrice = social !== 'nosocials'
            ? social !== 'all'
              ? social === 'concert'
                ? 1000
                : 500
              : 1500
            : 0;          
          netTotal += registrationPrice+socialPrice;
          details.push({
            id: 0,
            name: "Registration",
            price: {base:registrationPrice,social:socialPrice},
            isIndividual: false,
          });
        }

        const createdChallan = await prisma.challan.create({
          data: {
            userId: userId,
            detail: details || null,
            netTotal: netTotal,
            sportsTeam: {
              connect: sportsTeams.map((team) => ({ id: team.id })),
            },
            competitionsTeams: {
              connect: competitionTeams.map((team) => ({ id: team.id })),
            },
            paymentProof: paymentProofLink,
          },
        });

        res.apiSuccess({
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
    res.apiError(error.message, "Internal Server Error", 500);
  }
};

module.exports.getChallan = async (req, res) => {
  try {
    const { id } = req.params;

    const Challans = await prisma.Challan.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        user: true,
      },
    });
    const base64Image = await getSingleImage(Challans.paymentProof);
    Challans.paymentProof = base64Image;
    res.apiSuccess(Challans);
  } catch (err) {
    res.apiError(err.message, "Internal Server Error", 500);
  }
};
