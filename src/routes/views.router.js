import { Router } from "express"
import ViewController from "../controllers/views.controller.js"

const viewRouter = Router()

const {
    getHome,
    getRealTimeProducts,
    getChat,
    getProducts,
    getCarts,
    getLogin,
    getRegister
} = new ViewController()

viewRouter.get("/", getHome)

viewRouter.get("/realtimeproducts", getRealTimeProducts)

viewRouter.get("/messages", getChat)

viewRouter.get("/products", getProducts)

viewRouter.get("/carts/:cid", getCarts)

viewRouter.get("/sessions/login", getLogin)

viewRouter.get("/sessions/register", getRegister)

export default viewRouter