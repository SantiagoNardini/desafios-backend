import mongoose from "mongoose"

const messagesCollection = "messages"

const messageSchema = new mongoose.Schema({
    email: String,
    message: String
})

export const messageModel = mongoose.model(messagesCollection, messageSchema)