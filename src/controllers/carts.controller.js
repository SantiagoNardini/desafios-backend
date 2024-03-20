import { CartDao, TicketDao } from "../dao/factory.js"

class CartsController {
    constructor(){
        this.service = new CartDao()
        this.ticketService = new TicketDao()
    }

    getCarts = async (req, res) => {
        try {
            const carts = await this.service.getCarts().populate('products.product')
            return carts
        } catch (error) {
            console.log(error)
        }
    }
    
    getCartById = async (req, res) => {
        try {
            const cart = await this.service.getCartById(id).populate('products.product')
            return cart
        } catch (error) {
            console.log(error)
        }
    }
    
    addCart = async (req, res) => {
        try {
            const createCart = {products: []}
            const newCart = await this.service.addCart(createCart)
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

    purchaseCart = async (req, res) => {
        try {
            const { cid } = req.params
            const cart = await this.service.getCartById({_id: cid})
            
            if (!cart || cart.products.length === 0 || !cart.products) {
                return res.json({
                    status: 'error',
                    error: 'Cart not found'
                })
            }

            let total = 0
            cart.products.forEach(product => {
                total += product.quantity * product.price
            })

            const ticketData = {
                code: Math.floor(Math.random() * 1000000),
                purchase_datetime: new Date(),
                amount: total,
            }

            const ticket = await this.ticketService.createTicket(ticketData)

            res.json({
                status: 'success',
                result: ticket
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: 'Error al procesar compra',
                error
            })
        }
    }

}

export default CartsController