import { Router } from 'express'
import { userModel } from '../dao/models/users.model.js'
import { passportCall } from '../middleware/passportCall.js'
import { authorization } from '../middleware/authorization.middleware.js'

const UserRouter = Router()

UserRouter.get('/', passportCall('jwt'), authorization(['user_premium','admin']), async (req, res)=>{  
    try {
        const users = await userModel.find({isActive: true})
        res.json({
            status: 'success',
            result: users
        })
    } catch (error) {
        console.log(error)
    }

}) 


UserRouter.get('/:uid', async (req, res)=>{
    try {
        const { uid } = req.params
        const user = await userModel.findOne({_id: uid})
        res.json({
            status: 'success',
            result: user
        })
    } catch (error) {
        console.log(error)
    }
})

UserRouter.post('/', async (req, res)=>{
    try {
        const {firstName, lastName, email, password, age} = req.body

        const userNew  = {
            firstName,
            lastName,
            email,
            password,
            age
        }

        const result = await userModel.create(userNew)

        res.send({
            status: 'success',
            createUser: result
        })
    } catch (error) {
        console.log(error)
    }
})


UserRouter.put('/:uid', async (req, res)=>{
    try {
        res.send('Updated user')
    } catch (error) {
        console.log(error)
    }
})


UserRouter.delete('/:uid', async (req, res)=>{
    try {
        const {uid} = req.params
        const result = await userModel.findByIdAndUpdate({_id:uid}, {isActive: false})
        res.send('Deleted user')
    } catch (error) {
        console.log(error)
    }
})

export default UserRouter