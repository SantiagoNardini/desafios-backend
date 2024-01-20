import { Router } from "express"
import { messageModel } from "../dao/models/messages.model.js"

const MessagesRouter = Router()

MessagesRouter.get("/", async (req, res) => {
    try {
        const messages = await messageModel.find({})
        res.json({
            status: 'success',
            result: messages
        })
    } catch (error) {
        console.log(error)
    }
})

MessagesRouter.post("/", async (req, res) => {
    try {
        const message = await messageModel.create(req.body)
        res.json({
            status: 'success',
            result: message
        })
    } catch (error) {
        console.log(error)
    }
})

export default MessagesRouter

