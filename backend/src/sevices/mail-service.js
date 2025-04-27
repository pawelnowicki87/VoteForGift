import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  

export const sendMail =({ to, subject, text, html}) => {
  return transporter.sendMail({
    from: `Vote For Gift - Autoryzacja <${process.env.SMTP_HOST}>`,
    to,
    subject,
    text: text?? "",
    html
  });
}

export const sendActivationMail = (email, token) => {
  const link = `${process.env.CLIENT_URL}/activation/${token}`;

  return sendMail({
    to: email,
    subject: 'Account activation',
    html: `
    <p>Kliknij w link poniżej w celu aktyowwania konta</p>
    <a href=${link}>${link}</a>
    `
  })
}