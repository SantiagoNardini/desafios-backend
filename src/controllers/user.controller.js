import UserManagerMongo from '../dao/Mongo/userManagerMongo.js'
import { userService } from '../services/index.js'

class UserController {
    constructor(){
        this.service = userService
    }

    getUsers = async (req, res) => {
        try {
            const users = await this.service.getUsers()
            res.json({
                status: 'success',
                result: users
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    getUser = async (req, res) => {
        try {
            const { uid } = req.params
            const user = await this.service.getUserById({_id: uid})
            res.json({
                status: 'success',
                result: user
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    createUser = async (req, res) => {
        try {
            const {firstName, lastName, email, password, age} = req.body
    
            const userNew  = {
                firstName,
                lastName,
                email,
                password,
                age
            }
    
            const result = await this.service.createUser(userNew)
    
            res.send({
                status: 'success',
                createUser: result
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    updateUser = async (req, res) => {
        try {
            const {uid} = req.params
            const userToUpdate = req.body
            const result = await this.service.updateUser({_id:uid}, userToUpdate)
            res.status(200).send({
                status: 'success',
                message: result
            })
        } catch (error) {
            console.log(error)
        }
    }
    deleteUser = async (req, res) => {
        try {
            const {uid} = req.params
            const result = await this.service.deleteUser({_id:uid}, {isActive: false})
            res.send('Deleted user')
        } catch (error) {
            console.log(error)
        }
    }

}

export default UserController

