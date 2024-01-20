import mongoose from "mongoose"

const userCollection = "users"

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

export const userModel = mongoose.model(userCollection, userSchema)