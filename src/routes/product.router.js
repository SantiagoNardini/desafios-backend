import { Router } from "express"
import { productsModel } from "../dao/models/products.model.js"

const ProductsRouter = Router()

ProductsRouter.get('/', async (req, res)=>{  
    try {
        const {docs, hasPrevPage, hasNextPage, nextPage, prevPage, page} = await productsModel.paginate({}, {limit: 10, page: 1, lean: true})
        res.send({
            status: 'success',
            payload: docs,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
            page
        })
    } catch (error) {
        console.log(error)
    }

}) 

ProductsRouter.get("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid
        const foundProduct = await productsModel.findOne({_id: pid})
        res.send({ 
            status: "successful",
            foundProduct });
    } catch (error) {
        console.log(error)
    }
})

ProductsRouter.post("/", async (req, res) => {
    try {
        const product = req.body
        const newProduct = new productsModel.create(product)

        res.send({ 
            status: "success", 
            msg: "Product created", 
            newProduct })
   
    } catch (error) {
        console.log(error)
    }
    
})

ProductsRouter.put("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid
        const product = req.body
        const updateProduct = await productsModel.updateOne({_id: pid}, product)
        res.send({ 
            status: "success",
            msg: "Product updated",
            updateProduct })
    } catch (error) {
        console.log(error)
    }
    
})

ProductsRouter.delete("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid
        const deleteProduct = await productsModel.deleteOne({_id: pid})
        res.send({ 
            status: "success",
            msg: "Product deleted",
            deleteProduct })
    } catch (error) {
        console.log(error)
    }
    
})

export default ProductsRouter