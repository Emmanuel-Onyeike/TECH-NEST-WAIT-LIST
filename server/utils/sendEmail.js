import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async (to, subject) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Team TechNest" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text: 'Welcome to TechNest! Thanks for joining our waitlist.',
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <img src="cid:logo" alt="TechNest Logo" style="width: 100px; margin-bottom: 20px;" />
          <h2 style="color: #2c3e50;">Welcome to TechNest!</h2>
          <p style="font-size: 16px; color: #34495e;">
            You've been added to our waitlist. We'll keep you posted with the latest updates. 🚀
          </p>
        </div>
      `,
            attachments: [
                {
                    filename: 'logo.jpeg',
                    path: path.join(__dirname, './LOGO.png'),
                    cid: 'logo'
                }
            ]
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

export default sendEmail;
