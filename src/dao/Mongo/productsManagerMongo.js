import { productsModel } from "../models/products.model.js"

class ProductsManagerMongo {

    async getProducts() {
        return await productsModel.find({isActive: true})
    }

    async getProductById(pid) {
        return await productsModel.findOne({ _id: pid })
    }

    async addProduct(product) {
        await productsModel.create(product)
    }

    async updateProduct(pid, product) {
        await productsModel.updateOne({ _id: pid }, product, { new: true })
    }

    async deleteProduct(pid) {
        await productsModel.deleteOne({ _id: pid }, {isActive: false} ,{ new: true })
    }
}

export default ProductsManagerMongo