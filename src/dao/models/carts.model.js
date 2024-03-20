import mongoose from "mongoose"
import { productsModel } from "./products.model.js"

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
})

cartSchema.pre("findById",function(){
    this.populate(productsModel.product)
})

export const cartModel = mongoose.model(cartCollection, cartSchema)