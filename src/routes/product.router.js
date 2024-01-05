import { Router } from "express"
import { manager } from "../managers/productManagerFile.js"

const ProductsRouter = Router()



ProductsRouter.get("/", async (req, res) => {
   try {
        const { limit } = req.query
        const products = await manager.getProducts()
        const limitProducts = limit ? products.slice(0, limit) : products
        res.send(limitProducts)
   } catch (error) {
        return res.status(400).send(error.message)
   }
})

ProductsRouter.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const foundProduct = await manager.getProductsById(parseInt(pid));
        res.send(foundProduct)
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

ProductsRouter.post("/", async (req, res) => {
    try {
        const product = req.body
    product.id = await manager.generateId()
    product.status = true
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        return res.status(400).send("Incomplete data")
    }
    const addProduct = await manager.addProduct(product)
    if (!addProduct) {
        return res.status(400).send("Product cannot be added")
    } else {
        return res.send({ status: "success", msg: "Product added successfully"})
    }
    } catch (error) {
        res.status(400).send({ status: "error", msg: "Invalid Product" })
    }
    
})

ProductsRouter.put("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid
        const newProduct = req.body
        const updateProduct = await manager.updateProduct(pid, newProduct)
    if (!updateProduct) {
        return res.status(404).send("Product cannot be updated")
    } else {
        return res.send({ status: "success", msg: "Updated Product"})
    }
    } catch (error) {
        res.status(404).send({ status: "error", msg: "Product cannot be updated" })
    }
    
})

ProductsRouter.delete("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid
        const deleteProduct = await manager.deleteProduct(pid)
    if (!deleteProduct) {
        return res.status(404).send("Product cannot be deleted")
    } else {
        return res.send({ status: "success", msg: "Deleted Product"})
    }
    } catch (error) {
        res.status(404).send({ status: "error", msg: "Product cannot be deleted!" })
    }
    
})

export default ProductsRouter