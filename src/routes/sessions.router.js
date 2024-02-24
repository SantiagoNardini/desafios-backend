import { Router } from "express"
import { auth } from "../middleware/authentication.middleware.js"
import  UserManagerMongo from "../dao/Mongo/userManagerMongo.js"
import createHash from "../utils/hashBcrypt.js"
import { isValidPassword } from "../utils/hashBcrypt.js"
import passport from "passport"
import generateToken from "../utils/jsonWebToken.js"
import { authTokenMiddleware } from "../utils/jsonWebToken.js"

const router = Router()
const sessionsService = new UserManagerMongo()

router.post('/login', async (req, res)=> {
    try {
        const {email, password} = req.body

        const user = await sessionsService.getUserBy({email})

        if (!isValidPassword(password, user.password)) return res.status(401).send("Invalid credentials")
    
        const token = generateToken({
            fullname: `${user.firstName} ${user.lastName}`,
            id: user._id,
            email: user.email
        })

        res.status(200).send({
            status: 'success',
            message: 'Logged in',
            token
        })
        
        
    } catch (error) {
        res.send({status: 'error', error: error.message})
    }
})

router.post('/register', (req, res)=> {
    try {
        const {firstName, lastName, email, password} = req.body
    
        console.log(firstName, lastName, email, password)
        if (email === '' || password === '') return res.send('Data missing')
    
        const newUser = {firstName, lastName, email, password: createHash(password)}
        const result = sessionsService.createUser(newUser)
        
        const token = generateToken({
            id: result._id
        })

        res.status(200).send({
            status: 'success',
            message: 'User created',
            token
        })

        res.redirect('/products')
        
    } catch (error) {
        res.send({status: 'error', error: error.message})
    }
})

router.get('/current', authTokenMiddleware, async (req, res)=> {
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
