import { cartModel } from "../models/carts.model.js"

class CartsManagerMongo {
    async getCarts() {
        try {
            const carts = await cartModel.find().populate('products._id')
            return carts
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(id) {
        try {
            const cart = await cartModel.findById(id).populate('products._id')
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async addCart() {
        try {
            const newCart = await cartModel.create({})
            return newCart
        } catch (error) {
            console.log(error)
        }
    }

    async updateCart(id, cart) {
        try {
            const updatedCart = await cartModel.updateOne({ _id: id }, cart)
            return updatedCart
        } catch (error) {
            console.log(error)
        }
    }

    async deleteCart(id) {
        try {
            const deletedCart = await cartModel.deleteOne({ _id: id })
            return deletedCart
        } catch (error) {
            console.log(error)
        }
    }
}

export default CartsManagerMongo