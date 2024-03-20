import nodeMailer from 'nodemailer'
import { configObject } from '../config/connectDB.js'

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: configObject.gmail_user,
        pass: configObject.gmail_pass
    }
})

export const sendEmail = async (destination, subject, html) => await transporter.sendMail({
    from: 'Coder Test <nardinisantiago@gmail.com>',
    to: destination,
    subject,
    html,
})