import { Router } from 'express'
import { userModel } from '../models/users.model.js'

const UserRouter = Router()

UserRouter.get('/', async (req, res)=>{  
    try {
        const users = await userModel.find({})

        res.send(users)
    } catch (error) {
        console.log(error)
    }

}) 


UserRouter.get('/:uid', async (req, res)=>{
    const { uid } = req.params
    const user = await userModel.findOne({_id: uid})

    // console.log(req.params)

    res.send(user)
}) 

UserRouter.post('/', async (req, res)=>{
    const {firstName, lastName, email, password } = req.body
   
    const userNew = {
        firstName,
        lastName,
        email,
        password
    }

    const result = await userModel.create(userNew)

    res.status(200).send({
        status: 'success',
        usersCreate: result
    })
}) 


UserRouter.put('/:uid', async (req, res)=>{
    const {uid} = req.params
    const userToUpdate = req.body

    const result = await userModel.findOneAndUpdate({_id: uid}, userToUpdate, {new: true})

    res.status(200).send({
        status: 'success',
        message: result
    })
}) 


UserRouter.delete('/:uid', async (req, res)=>{
    const {uid} = req.params
    const result = await userModel.findByIdAndDelete({_id: uid})
    res.send(result)
})

export default UserRouter