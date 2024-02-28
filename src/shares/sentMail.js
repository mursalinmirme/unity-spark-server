import nodemailer from "nodemailer";
import { app } from "../app.js";

const sentMail = () => {
// send mail after select interview
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


// send mail after subscription
app.post("/subscriber-email-sent", async(req, res) => {
  try {
    const emailInfo = req.body;
    const reveiverEmail = emailInfo.email;
    const name = emailInfo.name;
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
      subject: "Congratulations! You're Now Part of Unity Spark Community", // Subject line
      text: `You have successfully suscribed our newletter community.`, // plain text body
      html: `<p>Dear ${name},</p><p>Congratulations! You've successfully joined the Unity Spark community, where exciting updates, exclusive offers, and valuable insights await you.</p>
      <p>What's Next?</p>
      <p>• Stay tuned for the latest news and happenings at Unity Spark.</p>
      <p>• Be the first to know about upcoming events and promotions.</p>
      <p>• Access exclusive content reserved just for our subscribers.</p>
      <p>We're thrilled to have you on board! If you ever have questions or want to share your thoughts, feel free to hit reply. We're here to make your Unity experience extraordinary.</p>
      <p>Cheers to new beginnings!</p>
      <p>Best regards,</p>
      <p>The Unity Spark Team</p>`, // html body
    });
    res.send(info);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message)
  }
})

// send mail for send announcements with subscribers
app.post("/send-announcement", async(req, res) => {
  try {
    const emailInfo = req.body;
    const receivers = emailInfo.to;
    const title = emailInfo.title;
    const emailBody = emailInfo.emailBody;
    console.log("get announcent req is", emailBody, receivers, title);
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
      to: receivers, // list of receivers
      subject: title, // Subject line
      text: title, // plain text body
      html: emailBody, // html body
    });
    res.send(info);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message)
  }
})


}//end sent mail fn
export default sentMail