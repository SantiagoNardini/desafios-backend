import express from "express"
import { manager } from "../dao/FileSystem/productManagerFile.js"
import { productsModel } from "../dao/models/products.model.js"

const router = express.Router()

router.get("/", async (req, res) => {
    const data = await manager.getProducts()
    if (data) {
    res.render("home", {data})
    }
})

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts", {})
})

router.get("/messages", (req, res) => {
    res.render("chat", {})
})

router.get("/products", async(req, res) => {
    const { limit = 10, pageQuery = 1 } = req.query
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, page } = await productsModel.paginate({}, { limit, page: pageQuery, lean: true })
    console.log(page)
    res.render("products", { docs, hasPrevPage, hasNextPage, nextPage, prevPage, page })
})

router.get("/carts/:cid", async(req, res) => {
    res.render("carts", {})
})

router.get("/sessions/login", (req, res) => {
    res.render("login")
})

router.get("/sessions/register", (req, res) => {
    res.render("register")
})

export default router