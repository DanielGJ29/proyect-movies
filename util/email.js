const pug = require('pug');
const { htmlToText } = require('html-to-text');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ patch: '../config.env' });

class Email {
  constructor(emails) {
    (this.emails = emails),
      (this.from = `Daniel Gonzalez<${process.env.EMAILS_FROM}>`);
  }

  newTransport() {
    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILSTRAP_PASS
      }
    });
  }

  async send() {
    const html = pug.renderFile(`${__dirname}/../../emails/baseEmail.pug`);
    const text = htmlToText(html);
    await this.newTransport().sendMail({
      from: this.from,
      to: this.emails,
      html,
      text: htmlToText(html),
      subject: 'this is a test email'
    });
  }
}

module.exports = { Email };
