import mongoose from "mongoose"
import dotenv from 'dotenv'
import program from '../utils/commander.js'
import MongoSingleton from "../utils/mongoSingleton.js"

const { mode } = program.opts()

console.log(mode)

dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
})

export const configObject = {
    port: process.env.PORT || 8080,
    mongo_url: process.env.MONGO_URL,
    secretOrKey: process.env.JWT_SECRET_KEY,
    persistence: process.env.PERSISTENCE,
    gmail_user: process.env.GMAIL_USER_APP,
    gmail_pass: process.env.GMAIL_PASS_APP,
    twilio_sid: process.env.TWILIO_ACCOUNT_SID,
    twilio_token: process.env.TWILIO_AUTH_TOKEN,
    twilio_number: process.env.TWILIO_NUMBER
}

const connectDB = async () => {
    try {
          await MongoSingleton.getInstance()
    } catch (error) {
        console.log(error)
    }
}

export default connectDB