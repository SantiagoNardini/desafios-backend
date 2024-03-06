import { Router } from "express"
import ProductController from "../controllers/products.controller.js"

const ProductsRouter = Router()

const {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} = new ProductController()

ProductsRouter.get('/', getProducts) 

ProductsRouter.get("/:pid", getProductById)

ProductsRouter.post("/", addProduct)

ProductsRouter.put("/:pid", updateProduct)

ProductsRouter.delete("/:pid", deleteProduct)

export default ProductsRouter