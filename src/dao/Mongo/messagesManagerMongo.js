import { messageModel } from "../models/messages.model.js"

class MessagesManagerMongo {
    async getMessages() {
        try {
            const messages = await messageModel.find({})
            return messages
        } catch (error) {
            console.log(error)
        }
    }

    async addMessage(message) {
        try {
            const newMessage = await messageModel.create(message)
            return newMessage
        } catch (error) {
            console.log(error)
        }
    }

    async deleteMessage(id) {
        try {
            const deletedMessage = await messageModel.deleteOne({ _id: id })
            return deletedMessage
        } catch (error) {
            console.log(error)
        }
    }
}

export default MessagesManagerMongo