import mongoose from "mongoose";

const ticketCollection = "tickets"

const ticketSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },
    code: {
      type: String,
      required: true,
      unique: true  
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: false
    },
    purchaser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

export const ticketModel = mongoose.model(ticketCollection, ticketSchema)