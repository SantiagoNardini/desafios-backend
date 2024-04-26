const express = require('express')
const cookieParser = require('cookie-parser')
const {engine} = require('express-handlebars')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const cors = require('cors')
// socket io _______________________________________________________________
const {config: configObject} = require('./config/config.js')

const { Server: HttpServer } = require('http')
const { Server: ServerIo } = require('socket.io')
const { initChatSocket, initProductsSocket } = require('./utils/socket.js')
const { router } = require('./routes')
// _____________________________________________________________________
const { initializePassport } = require('./config/passport.config.js')
const passport = require('passport')
const { addLogger, logger } = require('./middleware/logger.js')
const {dirname} = require('node:path')

const app = express()
const httpServer = new HttpServer(app)
const io = new ServerIo(httpServer)
const PORT = configObject.PORT 

// handlebars_______________________________________________________________
// const handlebars = require('express-handlebars')
app.engine('handlebars', engine({
    extname:'.handlebars'
}))
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')
    
// _________________________________________________________

// app.use(logger('dev'))
app.use(cors())
app.use('/virtual' ,express.static(__dirname+'/public')) 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
// session mongo_______________________________________________________________
// app.use(session(configObject.session))

// swagger_______________________________________________________________
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Documentación de proyecto Backend',
            description: 'Backend de un ecommerce',
            version: '1.0.0'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(specs))

// passport _______________________
initializePassport()
app.use(passport.initialize()) 
// app.use(passport.session())
// passport _______________________
app.use(addLogger)

app.use(router)

// socket_______________________________________________________________
initChatSocket(io)
initProductsSocket(io)

const initServer = app.listen(PORT, ()=>{
    console.log('Escuchando en el puerto: ' + PORT)
} )

module.exports = {
    initServer
}


