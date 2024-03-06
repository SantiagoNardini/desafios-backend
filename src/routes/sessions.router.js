import { Router } from "express"
import { authTokenMiddleware } from "../utils/jsonWebToken.js"
import { passportCall } from "../middleware/passportCall.js"
import { authorization } from "../middleware/authorization.middleware.js"
import SessionController from "../controllers/sessions.controller.js"

const router = Router()
const {
    register,
    login,
    current
} = new SessionController()

router.post("/register", register)

router.post("/login", login)

router.get('/current', passportCall('jwt'), authorization('user'), current)


export default router
