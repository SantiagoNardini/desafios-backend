import { Router } from 'express'
import UserController from '../controllers/user.controller.js'

const UserRouter = Router()

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = new UserController()

UserRouter.get('/', getUsers)

UserRouter.get('/:uid', getUser)

UserRouter.post('/', createUser)

UserRouter.put('/:uid', updateUser)

UserRouter.delete('/:uid', deleteUser)

export default UserRouter