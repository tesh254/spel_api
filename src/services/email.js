import nodemailer from "./node_modules/nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD
    }
});

const sendMail = (data) => {
    let link = `${data.domain}/email-verify?`
}
