import { Router } from "express"
import { auth } from "../middleware/authentication.middleware.js"
import  UserManagerMongo from "../dao/Mongo/userManagerMongo.js"
import createHash from "../utils/hashBcrypt.js"
import { isValidPassword } from "../utils/hashBcrypt.js"
import passport from "passport"
import generateToken from "../utils/jsonWebToken.js"
import { authTokenMiddleware } from "../utils/jsonWebToken.js"
import { passportCall } from "../middleware/passportCall.js"
import { authorization } from "../middleware/authorization.middleware.js"
import passportJWT from "passport-jwt"
import jwt from "jsonwebtoken"
import { userModel } from "../dao/models/users.model.js";

const router = Router()
const sessionsService = new UserManagerMongo()

router.post("/register", async(req, res) => {
    const{firstName, lastName, email, password}= req.body

    const userNew= {
    firstName, 
    lastName,
    email,
    password: createHash(password)
    }
    const result = await userModel.create(userNew)
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
})

router.post("/login", async (req,res)=>{
    const {email, password} = req.body

    const user= await userModel.findOne({email})
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
})


router.get('/current', passportCall('jwt'), authorization('user') , async (req, res)=> {
    res.send('<h1>Datos sensibles</h1>')
})


// router.get('/logout', (req, res)=> {
//     req.session.destroy(error => {
//         if (error) return res.send('Logout error')
        
//         res.redirect('/login')
//     })
// })


// router.post('/register', passport.authenticate('register', {failureRedirect: '/sessions/failregister'}), async (req, res)=> {
//     res.send({status: 'success', message: 'User created'})
// })

// router.get('/failregister', async (req, res)=> {
//     res.send({status: 'error', message: 'failed to register'})
// })

// router.post('/login', passport.authenticate('login', {failureRedirect: '/sessions/faillogin'}), async (req, res)=> {
//     if (!req.user) return res.status(401).send({status: 'error', error: 'Invalid credentials'})

//     req.session.user = {
//         firstName: req.user.firstName,
//         lastName: req.user.lastName,
//         email: req.user.email,
//         id: req.user._id
//     }

//     res.send({status: 'success', message: req.user})
// })

// router.get('/faillogin', async (req, res)=> {
//     res.send({status: 'error', message: 'failed to register'})
// })

// router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req, res)=> {})

// router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/sessions/login'}), async (req, res)=> {
//     req.session.user = req.user
//     res.redirect('/products')
// })

export default router
