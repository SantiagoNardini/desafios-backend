import express from "express"
import { manager } from "../dao/FileSystem/productManagerFile.js"

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

export default router