import passport from "passport"
import localStrategy from "passport-local"
import GithubStrategy from "passport-github2"
import { userModel } from '../dao/models/users.model.js'
import createHash from "../utils/hashBcrypt.js"
import isValidPassword from "../utils/hashBcrypt.js"
import passportJWT from "passport-jwt"

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const initializePassport = () => {

    const cookieExtractor = req => {
        let token = null
        if(req && req.cookies){
            token = req.cookies['cookieToken']
            console.log(token)
        }
        return token
    }

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'secretKey' 
    }, async (jwt_payload, done)=>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error, false, {message})
        }
    }))

    passport.use('registerpassport', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
        try {
            const {firstName, lastName, email, age} = req.body
            let user = await userModel.findOne({email: username})

            if (user) return done(null, false, {message: 'User already exists'})

            let newUser = {
                firstName,
                lastName,
                username,
                email,
                password: createHash(password),
                age,
                cartID: null
            }

            let result = await userModel.create(newUser)

            return done(null, result)
        }
        catch (error) {
            return done(error)
        }
    }))

    passport.use('loginpassport', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'}, 
        async (req, username, password, done) => {
        try {
            const user = await userModel.findOne({email: username})

            if (!user) {
                return done(null, false, {message: 'User not found'})
            }
            
            if (!isValidPassword(password, user.password)) return done(null, false)
            return done(null, user, {message: 'Logged in'})
        }
        catch (error) {
            return done(error)
        }
    })) 
}

export default initializePassport