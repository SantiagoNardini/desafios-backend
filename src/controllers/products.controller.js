import ProductsManagerMongo from "../dao/Mongo/productsManagerMongo.js"
import { productService } from "../services/index.js"

class ProductController {
    constructor(){
        this.service = productService
    }

    getProducts = async (req, res) => {
        try {
            const products = await this.service.getProducts()
            res.send({
                status: "success",
                payload: products
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    getProductById = async (req, res) => {
        try {
            const product = await this.service.getProductById({ _id: pid })
            res.send({
                status: "success",
                payload: product
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    addProduct = async (req, res) => {
        try {
            const { body } = req
            const result = await this.service.addProduct(body)
            res.send({
                status: "success",
                payload: result
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    updateProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const { body } = req

            const result = await this.service.updateProduct(pid, body)
            res.send({
                status: "success",
                payload: result
            })
        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const result = await this.service.deleteProduct(pid)
            res.send({
                status: "success",
                payload: result
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProductController

