import passport from "passport"
import local from "passport-local"
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
}


export default initializePassport