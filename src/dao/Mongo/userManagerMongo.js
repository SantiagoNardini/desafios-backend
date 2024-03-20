import { userModel } from "../models/users.model.js";

class UserManagerMongo {
    async getUsers() {
        return await userModel.find({})
    }
    async getUserById(uid) {
        return await userModel.findOne({_id: uid})
    }

    async getUserBy(filter) {
        return await userModel.findOne(filter)
    }
    async createUser(userNew) {
        return await userModel.create(userNew)
    }
    async updateUser(uid, userUpdate) {
        return await userModel.updateOne({_id: uid}, userUpdate, {new: true})
    }

    async deleteUser(uid) {
        return await userModel.deleteOne({_id: uid})
    }
}

export default UserManagerMongo