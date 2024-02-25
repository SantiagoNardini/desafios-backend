import { Router } from "express"
import jwt from "../utils/jsonWebToken.js"

class RouterClass {
    constructor() {
        this.router = Router()
    }

    getRouter = () => {
        return this.router
    }

    init (){}

    applyCallback(callbacks) {
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this, params)
            } catch (error) {
                console.log(error)
                params[1].status(500).send(error)
            }
        })
    }

    generateCustomResponse = (req, res, next) => {
        res.sendSuccess = payload => res.send({status: 'success', payload})
        res.sendServerError = error => res.send({status: 'error', error})
        res.sendUserError = error => res.send({status: 'error', error})
    }

    handlePolicies = policies => (req, res, next) => {
        if (policies[0] === 'public') next()
        const authHeaders = req.headers.authorization
        const token = authHeaders.split(' ')[1]
        let user = jwt.verify(token, 'secretKey')
        if (!policies.includes(user.role.toUpperCase())) res.status(403).send({status: 'error', error: 'Unauthorized'})
        req.user = user
        next()
    }

    get(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies, this.generateCustomResponse, this.applyCallback(callbacks))
    }
}

export default RouterClass