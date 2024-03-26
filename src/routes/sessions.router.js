const Router = require('./router.js')
const jwt = require('jsonwebtoken')
// UserModel
const { 
    loginUser, 
    registerUser ,
    logoutUser,
    forgotPassword,
    resetPasswordToken,
    resetPassword
    
} = require('../controllers/sessions.controller.js')
const { generateToken } = require('../utils/jsonWebToken.js')
const { userModel } = require('../dao/Mongo/models/users.model.js')
const { sendMail } = require('../utils/sendEmail.js')
const {base_url} = require('../config/config.js')
const { logger } = require('../middleware/logger.js')
const {jwt_private_key} = require('../config/config.js')
const { isValidPassword, createHash } = require('../utils/hashBcrypt.js')
const { log } = require('winston')
const {passportCall} = require('../utils/passportCall.js')
const {authorization} = require('../middleware/authorization.middleware.js')
const { current } = require('../controllers/sessions.controller.js')
// const {getUser} = require('../controllers/users.controller')

class AuthRouter extends Router {
    init() {
        this.post('/login',                ['PUBLIC'], loginUser)        
        this.post('/register',             ['PUBLIC'], registerUser)        
        this.get('/logout',                ['PUBLIC'], logoutUser)        
        // cambiar contraseña
        // Ruta para mandar un mail con un link para cambiar la contraseña
        this.post('/forgot-password',       ['PUBLIC'], forgotPassword)        
        // Cambiar la contraseña        
        this.get('/reset-password/:token',  ['PUBLIC'], resetPasswordToken)
        // this.post('/reset-password/:token', async (req, res)=>{
        this.post('/reset-password',        ['PUBLIC'], resetPassword)
        this.get('/current', passportCall('jwt'), authorization('USER'), current)
    }
}

module.exports = new AuthRouter()