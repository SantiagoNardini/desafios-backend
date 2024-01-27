import { Router } from "express"
import { cartModel } from "../dao/models/carts.model.js"

const CartRouter = Router()

CartRouter.get("/", async (req, res) => {
    try {
        const carts = await cartModel.find({})
        res.json({
            status: 'success',
            result: carts
        })
    } catch (error) {
        console.log(error)
    }
})

CartRouter.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartModel.findOne({_id: cid})
        res.json({
            status: 'success',
            result: cart
        })
    } catch (error) {
        console.log(error)
    }
})

CartRouter.post("/", async (req, res) => {
    try {
        const { body } = req
        const result = await cartModel.create(body)

        res.json({
            status: 'success',
            result
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
})


CartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const updateCart = await cartModel.updateOne({_id: cid}, {$push: {products: pid}})
        res.json({
            status: 'success',
            result: updateCart
        })
    } catch (error) {
        console.log(error)
    }
    
})

CartRouter.put("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const updateCart = await cartModel.updateOne({_id: cid}, {$pull: {products: pid}})
        res.json({
            status: 'success',
            result: updateCart
        })
    } catch (error) {
        console.log(error)
    }
})

CartRouter.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const deleteCart = await cartModel.deleteOne({_id: cid})
        res.json({
            status: 'success',
            result: deleteCart
        })
    } catch (error) {
        console.log(error)
    }
})

CartRouter.delete("api/carts/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const deleteCart = await cartModel.updateOne({_id: cid}, {$pull: {products: pid}})
        res.json({
            status: 'success',
            result: deleteCart
        })
    } catch (error) {
        console.log(error)
    }
})

CartRouter.put("api/carts/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const updateCart = await cartModel.updateOne({_id: cid}, req.body)
        res.json({
            status: 'success',
            result: updateCart
        })
    } catch (error) {
        console.log(error)
    }
})

CartRouter.put("api/carts/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const updateCart = await cartModel.updateOne({_id: cid}, {$push: {products: pid}})
        res.json({
            status: 'success',
            result: updateCart
        })
    } catch (error) {
        console.log(error)
    }
})

CartRouter.delete("api/carts/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const deleteCart = await cartModel.deleteOne({_id: cid})
        res.json({
            status: 'success',
            result: deleteCart
        })
    } catch (error) {
        console.log(error)
    }
})

export default CartRouter;