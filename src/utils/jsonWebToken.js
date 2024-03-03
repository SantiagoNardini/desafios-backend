import jwt from 'jsonwebtoken'
import { configObject } from '../config/connectDB.js'

const { secretOrKey } = configObject

const generateToken = (user) => jwt.sign(user, secretOrKey, {expiresIn: '24h'})

export const authTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if (!authHeader) return res.status(401).send({status: 'error', message: 'No token provided'})

    const token = authHeader.split(' ')[1]

    jwt.verify(token, secretOrKey, (error, decodeUser) => {
        if (error) return res.status(401).send({status: 'error', message: 'Invalid token'})

        req.user = decodeUser
        next()
    })
}

export default generateToken