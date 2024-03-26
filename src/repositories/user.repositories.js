const UserDTO = require("../dto/userDto")
const { logger } = require("../middleware/logger")

class UserRepositories { // UserServices
    constructor(dao){
        this.dao = dao
    }

    async getUsers(limit, page){
        try {
            return await this.dao.get(limit, page)            
        } catch (error) {
            return error
        }
    }

    async getUser(email){
        try {
            return await this.dao.getBy(email)   
        } catch (error) {
            logger.error(error)
        }
    }
    
    async createUser(newUser){
        try {
            // let newUserNormalize = new UserDTO(newUser)
            // let result = 
            return await this.dao.create(newUser)       
        } catch (error) {
            return error
        }
    }

    async updateUser(){
        try {
            return await this.dao.update()
        } catch (error) {
            return error
        }
    }    
    async deleteUser(){}    
}

module.exports = UserRepositories