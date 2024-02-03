import { Router } from "express"
import { auth } from "../middleware/authentication.middleware.js"
import  UserManagerMongo from "../dao/Mongo/userManagerMongo.js"

const router = Router()
const sessionsService = new UserManagerMongo()

router.post('/login', async (req, res)=> {
    try {
        const {email, password} = req.body

        console.log(email, password)

        const user = await sessionsService.getUserBy({email})
        if (!user || user.password !== password) return res.send({status: 'error', error: 'User not found with that email or password'})
    
        req.session.user = {id: user._id, username: user.firstName, admin: true}
        
        res.redirect('/products')
    } catch (error) {
        res.send({status: 'error', error: error.message})
    }
})

router.post('/register', (req, res)=> {
    try {
        const {firstName, lastName, email, password} = req.body
    
        console.log(firstName, lastName, email, password)
        if (email === '' || password === '') return res.send('Data missing')
    
        const newUser = {firstName, lastName, email, password}
        const result = sessionsService.createUser(newUser)
        
        res.redirect('/products')
        
    } catch (error) {
        res.send({status: 'error', error: error.message})
    }
})

router.get('/logout', (req, res)=> {
    req.session.destroy(error => {
        if (error) return res.send('Logout error')
        
        res.redirect('/login')
    })
})

router.get('/current', auth, (req, res)=> {
    res.send('<h1>Datos sensibles</h1>')
})

export default router