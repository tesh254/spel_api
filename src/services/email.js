import nodemailer from "nodemailer";
import config from "../config";
import verifyEmail from "./verifyEmail";
import { jwtSignature } from "./jwt";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD
  }
});

const sendMail = data => {
  let link = `${data.domain}/spel/v1/email-verify?token=${jwtSignature(
    data.toMail
  )}`;

  let mailOptions = {
    from: config.mail.email,
    to: data.toMail,
    subject: data.subject,
    html: verifyEmail(data.username, data.toMail, link)
  };

  transporter.sendMail(mailOptions, error => {
    if (error) console.log(error.message);
    transporter.close();
  });
};

export default sendMail;
