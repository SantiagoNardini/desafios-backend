import express from "express";
import ProductManagerFile from "./productManagerFile.js";
const app = express()

const manager = new ProductManagerFile

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/products", async (req, res) => {
    try {
        const { limit } = req.query
        const products = await manager.getProducts()
        const limitProducts = limit ? products.slice(0, limit) : products
        res.send(limitProducts)
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

app.get("/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const foundProduct = await manager.getProductsById(parseInt(pid));
        res.send(foundProduct)
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

app.listen(8080, ()=>{
    console.log('Escuchando en el puerto 8080')
} )