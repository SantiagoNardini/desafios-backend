import ProductsManagerMongo from "../dao/Mongo/productsManagerMongo.js"

class ProductController {
    constructor(){
        this.service = new ProductsManagerMongo()
    }

    getProducts = async (req, res) => {
        try {
            const products = await this.service.getProducts()
            return products
        } catch (error) {
            console.log(error)
        }
    }
    
    getProductById = async (req, res) => {
        try {
            const product = await this.service.getProductById({ _id: pid })
            return product
        } catch (error) {
            console.log(error)
        }
    }
    
    addProduct = async (req, res) => {
        try {
            const newProduct = new productsModel(product)
            await newProduct.save()
            return newProduct
        } catch (error) {
            console.log(error)
        }
    }
    
    updateProduct = async (req, res) => {
        try {
            const updatedProduct = await this.service.updateProduct({ _id: pid }, product)
            return updatedProduct
        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const deletedProduct = await this.service.deleteProduct({ _id: pid })
            return deletedProduct
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProductController

