import passport from "passport"
import local from "passport-local"
import GithubStrategy from "passport-github2"
import { userModel } from '../dao/models/users.model.js'
import createHash from "../utils/hashBcrypt.js"
import isValidPassword from "../utils/hashBcrypt.js"

const LocalStrategy = local.Strategy
const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const {firstName, lastName, email} = req.body
        try {
            let user = await userModel.findOne({email})

            if (user) return done(null, false)

            let newUser = {
                firstName,
                lastName,
                email,
                password: createHash(password)
            }

            let result = await userModel.create(newUser)
            return done(null, result)

        } catch (error) {
            return done(error)
        }
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({email: username})
            if (!user) {
                console.log('User not found')
                return done(null, false)
            }
            if (!isValidPassword(password, user.password)) {
                console.log('Invalid password')
                return done(null, false)
            } else {
                return done(null, user) 
            }
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {done(null, user._id)})
    passport.deserializeUser( async (id, done) => {
        let user = await userModel.findById({_id: id})
        done(null, user)
    })

    passport.use('github', new GithubStrategy({
        clientID: "Iv1.50adc0eff9adacdf",
        clientSecret: "7d85add75201b05b64f7fca0da55aca93730d3de",
        callbackURL: "http://localhost:8080/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) =>{
        console.log("profile:", profile)
        try {
            let user = await userModel.findOne({email: profile._json.email})
            if (!user) {
                let newUser = {
                    firstName: profile._json.name,
                    lastName: profile._json.name,
                    email: profile._json.email,
                    password: ""
                }

                let result = await userModel.create(newUser)
                return done(null, result)
            }
            return done(null, user)
        } catch (error) {
            done(error)
        }
    }))
}


export default initializePassport