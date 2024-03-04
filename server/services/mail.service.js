import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// const { to, cc, bcc, subject, message, attachment, smtpDetails } = req.body;
// if (!to || !subject || !message || !smtpDetails) return res.status(400).send('input cannot be empty')

const __dirname = path.resolve();

const imagePath = path.resolve(__dirname, './assets/files/hello.jpg');
const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });



const CONFIG_MAILER = Object.freeze({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    },
    sender: "Admin",
    // https://stackoverflow.com/questions/45088006/nodejs-error-self-signed-certificate-in-certificate-chain
    tls: {
        rejectUnauthorized: false
    }
})

class MailService {
    async sendActivationEmail(to, link) {
      
        const transporter = nodemailer.createTransport(CONFIG_MAILER)
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Activation account from' + ' ' + process.env.SERVER_URL,
            text: 'Ваше письмо с активацией. Перейдите по ссылке! Спасибо.',
            html:
                `
                <h1>Вы успешно зарегистрировались!</h1>
                <p>Ваше письмо с активацией. Перейдите по ссылке:</p>
                <p>${link}</p>
                <img src="data:image/jpeg;base64,${imageData}" alt="Изображение">
                `,
            attachments: [
                {
                    filename: 'greetings.txt',
                    path: './assets/files/greetings.txt',
                },

            ],
        })

        transporter.close()
    }
}




export default new MailService();