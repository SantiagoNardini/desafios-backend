import { productsModel } from "../models/products.model"

class ProductsManagerMongo {

    async getProducts() {
        try {
            const products = await productsModel.find()
            return products
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(pid) {
        try {
            const product = await productsModel.findOne({ _id: pid })
            return product
        } catch (error) {
            console.log(error)
        }
    }

    async addProduct(product) {
        try {
            const newProduct = new productsModel(product)
            await newProduct.save()
            return newProduct
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(pid, product) {
        try {
            const updatedProduct = await productsModel.updateOne({ _id: pid }, product)
            return updatedProduct
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(pid) {
        try {
            const deletedProduct = await productsModel.deleteOne({ _id: pid })
            return deletedProduct
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProductsManagerMongo