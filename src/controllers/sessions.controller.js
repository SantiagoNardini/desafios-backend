import UserManagerMongo from "../dao/Mongo/userManagerMongo.js"
import createHash from "../utils/hashBcrypt.js"
import { isValidPassword } from "../utils/hashBcrypt.js"
import generateToken from "../utils/jsonWebToken.js"
import UserController from "./user.controller.js"

class SessionController {
    constructor() {
        this.service = new UserManagerMongo()
    }

    register = async (req, res) => {
        try {
            const{firstName, lastName, email, password}= req.body
    
            const userNew= {
            firstName, 
            lastName,
            email,
            password: createHash(password)
            }
            const result = await this.service.createUser(userNew)
            const token = generateToken({
            firstName,
            lastName,
            id: result._id
            })
    
            res.cookie("cookieToken", token,{
                maxAge: 60 * 60 * 1000 *24,
                httpOnly: true
            }).send({
                status: "success",
                usersCreate: result, 
                token
            })
            
        } catch (error) {
            res.send({status: "error", error})
        }
    }

    login = async (req, res) => {
        try {
            const {email, password} = req.body
    
            const user= await this.service.getUserBy({email})
            if(!isValidPassword(password, user.password)) return res.status(401).send("Invalid password")
        
            const token = generateToken({
            id: user._id,
            email: user.email,
            role: user.role
            })
        
            res.cookie("cookieToken", token, {
                maxAge : 60 * 60 * 1000 *24,
                httpOnly: true
            }).send({
                status: "success",
                usersCreate: "login success", 
                token
            })
            
        } catch (error) {
            res.send({status: "error", error})
        }
    }

    current = async (req, res) => {
        try {
            res.send('<h1>Datos sensibles</h1>')
        } catch (error) {
            res.send({status: "error", error})
        }
    }
}


export default SessionController