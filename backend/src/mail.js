import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: 'variables.env'});

export const mailTransport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export const mailTemplate = (text) => `
  <div classname="email" style="
    border: 1px solid black,
    font-size: 20px;
    line-height: 2;
    font-family: sans-serif;
    padding: 20px;
  ">
  <h2>Hello, There</h2>

  <p>${text}</p>

  <p>Love, Amarachi Agbo</p>
  </div>
`