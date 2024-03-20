import UserDto from "../dto/userDto.js"

class UserRepository {
    constructor(userDao) {
        this.dao = userDao
    }

    getUsers = async () => await this.dao.getUsers()
    getUserById = async (uid) => await this.dao.getUserById(uid)
    getUserBy = async (filter) => await this.dao.getUserBy(filter)
    createUser = async (userNew) => {
        const newUserDto = new UserDto(userNew)
        return await this.dao.createUser(newUserDto)
    }
    updateUser = async (uid, userUpdate) => await this.dao.updateUser(uid, userUpdate)
    deleteUser = async (uid) => await this.dao.deleteUser(uid)

}

export default UserRepository