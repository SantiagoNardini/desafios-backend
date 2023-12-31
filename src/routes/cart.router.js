import { Router } from "express"
import CartManager from "../managers/cartManager.js"

const CartRouter = Router()

const manager = new CartManager()

CartRouter.post("/", async (req, res) => {
    try {
        const newCart = await manager.addCart()
        res.send(newCart)
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

CartRouter.get("/:cid", async (req, res) => {
    try {
        const cid = req.params.cid
        const foundCart = await manager.getCartById(parseInt(cid));
        res.send(foundCart)
    } catch (error) {
        return res.status(404).send({ status: "error", msg: "Product not found" })
    }
})

CartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const result = await manager.addProductToCart(Number(cid), Number(pid))
        res.send({ status: "success", payload: result })
    } catch (error) {
        return res.status(404).send({ status: "error", msg: "Product could not be added" })
    }
    
})

export default CartRouter;