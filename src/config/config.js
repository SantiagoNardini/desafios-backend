const MongoStore = require('connect-mongo')
const { connect } = require('mongoose')
const dotenv = require('dotenv')
const { commander } = require('../utils/commander')
const MongoSingleton = require('./mongoSingleton')

const { mode } =  commander.opts()

const enviroment = mode || "development"

dotenv.config({
    path: enviroment === 'development' ? './.env.development' : './.env.production'
})

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/ecommerce'

exports.config = {
    PORT:            process.env.PORT                || 8080,
    TEST_MAIL:       process.env.TEST_MAIL_ADMIN     || '', 
    MAIL_PASS:       process.env.TEST_MAIL_PASS      || '',
    ACCOUNT_SID:     process.env.TWILIO_ACCOUNT_SID  || '',
    AUTH_TOKEN:      process.env.TWILIO_AUTH_TOKEN   || '',
    PHONE_NUMBER:    process.env.TWILIO_PHONE_NUMBER ||'',
    NUMBER_MIO:      process.env.NUMBER_MIO          || '',
    adminName:       process.env.ADMIN_NAME          || 'admin',
    adminPassword:   process.env.ADMIN_PASSWORD      || 'admin', 
    persistence:     process.env.PERSISTENCE         || 'MONGO',  
    jwt_private_key: process.env.JWT_PRIVATE_KEY     || 'secretKey', 
    base_url:        process.env.BASE_URL            || '',
    MONGO_URL:       url,
    dbConnection:    async () => await MongoSingleton.getInstance(),
    session: {
        store: MongoStore.create({
            mongoUrl: url,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            ttl: 15000000000
        }), 
        secret: 'secretKey',
        resave: false,
        saveUninitialized: false,
    }
}


