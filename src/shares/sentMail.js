const nodemailer = require("nodemailer");
const app = require("../app.js");

const sentMail = (app) => {
    // node mailer image system
app.post("/sent-invite-email", async(req, res) => {
    try {
      const emailDetails = req.body;
      const reveiverEmail = emailDetails.to;
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: "teamcodewizards@gmail.com",
          pass: "shlp madz rqtg hhmq",
        },
      });
      // console.log("The email details is", emailDetails);
      const info = await transporter.sendMail({
        from: 'teamcodewizards@gmail.com', // sender address
        to: reveiverEmail, // list of receivers
        subject: "Invitation for Interview at Unity Spark", // Subject line
        text: `You have been selected for interview at Unity Spark for position ${emailDetails.position}`, // plain text body
        html: `<p>Dear ${emailDetails.name},</p><p>Congratulations! We are pleased to inform you that you have been selected for an interview at Unity Spark for the position of ${emailDetails.position}. We were highly impressed with your skills and experience, and we believe you would be a valuable addition to our team.</p><p>Date: ${emailDetails.date}</p><p>Time: ${emailDetails.start} - ${emailDetails.end}</p><br /><a href=${'https://unity-spark-22122.web.app/dashboard/interview'}>Join Link : https://unity-spark-22122.web.app/dashboard/interview</a><br /><p>Please come prepared to discuss your experiences, achievements, and how your skills align with the requirements of the position. If you have any specific questions or need further information before the interview, feel free to reach out to us.</p><p>We look forward to meeting you and getting to know you better.</p><p>The interview will take place at our Unity Spark website</p><p>Best regards,</p><p>Unity Spark Team<p>`, // html body
      });
      console.log(info);
      res.send(info);
    } catch (error) {
      res.status(500).send(error.message)
    }
    })
}
module.exports = sentMail