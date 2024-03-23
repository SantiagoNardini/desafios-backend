import { CartDao, TicketDao } from "../dao/factory.js"
import { cartService, productService, userService } from "../services/index.js"

class CartsController {
    constructor(){
        this.service = cartService
        this.userService = userService
        this.productService = productService
        this.cartService = cartService
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
        const userId = req.user._id; 
        const newCart = await this.cartService.addCart();
        console.log('Nuevo carrito:', newCart);

        if (!newCart) {
        console.error('Error al crear el carrito. newCart es null o undefined.');
        res.status(500).send('Error al crear el carrito');
        return;
        }

        const cartId = newCart._id;
        // Actualizar el campo cartID del usuario con el ID del carrito creado
        const updatedUser = await this.userService.findByIdAndUpdate(userId, { cartID: cartId }, { new: true });

        // Verificar si se pudo actualizar el usuario
        if (!updatedUser) {
        console.error('Error al actualizar el campo cartID del usuario.');
        res.status(500).send('Error al actualizar el campo cartID del usuario.');
        return;
        }

        // Obtener el carrito actualizado
        const updatedCart = await this.cartService.getCartById(cartId);

        res.json(updatedCart);
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
            const { pid } = req.params;
            const { title, description, price, quantity } = req.body;

            // Obtener el ID de usuario
            const userId = req.user._id;
            console.log(userId);

        //Verificar si el usuario tiene carrito 
            let user = await this.userService.getUserById(userId);
            let cartId = user.cartID;

            // Agrego producto con el id del producto
            await this.cartService.addProductToCart(cartId, { pid, title, description, price, quantity });

            res.status(200).json({ message: 'Producto agregado al carrito correctamente' });

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