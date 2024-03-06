import CartsManagerMongo from "../dao/Mongo/cartsManagerMongo.js"

class CartsController {
    constructor(){
        this.service = new CartsManagerMongo()
    }

    getCarts = async (req, res) => {
        try {
            const carts = await this.service.getCarts().populate('products._id')
            return carts
        } catch (error) {
            console.log(error)
        }
    }
    
    getCartById = async (req, res) => {
        try {
            const cart = await this.service.getCartById(id).populate('products._id')
            return cart
        } catch (error) {
            console.log(error)
        }
    }
    
    addCart = async (req, res) => {
        try {
            const newCart = await this.service.addCart({})
            return newCart
        } catch (error) {
            console.log(error)
        }
    }
    
    updateCart = async (req, res) => {
        try {
            const updatedCart = await this.service.updateCart({ _id: id }, cart)
            return updatedCart
        } catch (error) {
            console.log(error)
        }
    }

    addProductToCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const updateCart = await this.service.addProductToCart({_id: cid}, {$push: {products: pid}})
            res.json({
                status: 'success',
                result: updateCart
            })
        } catch (error) {
            console.log(error)
        }    
    }

    updateProductFromCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const updateCart = await this.service.updateProductFromCart({_id: cid}, {$pull: {products: pid}})
            res.json({
                status: 'success',
                result: updateCart
            })
        } catch (error) {
            console.log(error)
        }
    }

    deleteCart = async (req, res) => {
        try {
            const deletedCart = await this.service.deleteCart({ _id: id })
            return deletedCart
        } catch (error) {
            console.log(error)
        }
    }

    deleteProductFromCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const deleteCart = await this.service.deleteProductFromCart({_id: cid}, {$pull: {products: pid}})
            res.json({
                status: 'Product deleted from cart',
                result: deleteCart
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default CartsController