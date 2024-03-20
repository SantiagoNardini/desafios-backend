import { Router } from "express"
import CartsController from "../controllers/carts.controller.js"

const CartRouter = Router()

const {
    getCarts,
    getCartById,
    addCart,
    updateCart,
    addProductToCart,
    updateProductFromCart,
    deleteProductFromCart,
    deleteCart,
    purchaseCart
} = new CartsController()

CartRouter.get("/", getCarts)

CartRouter.get("/:cid", getCartById)


CartRouter.post("/", addCart)

CartRouter.post("/:cid/product/:pid", addProductToCart)


CartRouter.put("/:cid/product/:pid", updateProductFromCart)

CartRouter.put("api/carts/:cid", updateCart)


CartRouter.delete("/:cid", deleteCart)

CartRouter.delete("api/carts/:cid/products/:pid", deleteProductFromCart)

CartRouter.post("/:cid/purchase", purchaseCart)

export default CartRouter;