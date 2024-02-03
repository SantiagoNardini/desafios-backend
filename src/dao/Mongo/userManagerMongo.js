import { userModel } from "../models/users.model.js";

class UserManagerMongo {
    async getUsers() {
        try {
            const users = await userModel.find({})
            return users
        } catch (error) {
            console.log(error)
        }
    }
    async getUserById(uid) {
        try {
            const user = await userModel.findOne({_id: uid})
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async getUserBy(filter) {
        try {
            const user = await userModel.findOne(filter)
            return user
        } catch (error) {
            console.log(error)
        }
    }
    async createUser(userNew) {
        try {
            const newUser = await userModel.create(userNew)
            return newUser
        } catch (error) {
            console.log(error)
        }
    }
    async updateUser(uid, userUpdate) {
        try {
            const updatedUser = await userModel.updateOne({_id: uid}, userUpdate)
            return updatedUser
        } catch (error) {
            console.log(error)
        }
    }

    async deleteUser(uid) {
        try {
            const deletedUser = await userModel.deleteOne({_id: uid})
            return deletedUser
        } catch (error) {
            console.log(error)
        }
    }
}

export default UserManagerMongo