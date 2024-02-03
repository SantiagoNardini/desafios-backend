import mongoose from "mongoose"

const userCollection = "users"

const userSchema = new mongoose.Schema({
   firstName: {
       type: String,
       index: true,
       required: true
   },
   lastName: String,
   email: {
       type: String,
       index: true,
       unique: true
   },
   password: {
       type: String,
       required: true
   },
   role: {
       type: String,
       enum: ['admin', 'user'],
       default: 'user'
   }
})

export const userModel = mongoose.model(userCollection, userSchema)