import twilio from "twilio"
import { configObject } from "../config/connectDB.js"

const { twilio_sid, twilio_token, twilio_number } = configObject


const client = twilio(twilio_sid, twilio_token)

export const sendSms = ( nombre, apellido ) => client.messages.create({
    body: `Gracias por tu compra ${nombre} ${apellido}`,
    from: twilio_number,
    to: '+541133176661'
})