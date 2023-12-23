import fileSystem from 'fs'
const {promises} = fileSystem
const fs = promises

class CartManager {
    constructor() {
        this.path = './cart.json';
    }
    async getCarts() {
        try {
            const carts = await fs.readFile(this.path, "utf-8");
            return JSON.parse(carts);
        } catch (error) {
            return [];
        }
    }
    
    async generateId() {
        const carts = await this.getCarts();
        if (carts.length === 0) {
            return 1;
        } else {
            return carts[carts.length - 1].id + 1;
        }
    }


    async addCart() {
        const id = await this.generateId();
        const newCart = { id, products: [] };
        const carts = await this.getCarts();
        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        const idCart = carts.find((cart) => cart.id === id);
        if (idCart) {
            return idCart;
        } else {
            return null;
        }
    }

    async getProductsInCart(id) {
        const cart = await this.getCartById(id);
        if (cart) {
            return cart.products;
        } else {
            return null;
        }
    }

    async addProductToCart(cid, pid) {
        const carts = await this.getCarts();
        const cart = carts.find((cart) => cart.id === cid);
        if (cart) {
            cart.products.push(product);
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
            return cart;
        } 
        const product = {
            id: parseInt(pid),
            quantity: 1
        }

        const cartProducts = carts[index].products
        const productExist = cartProducts.find(cartProduct => cartProduct.id === product.id)
        if (productExist) {
            productExist.quantity++
        } else {
            cartProducts.push(product)
        }
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2))
        return carts[index]
    }
}

export default CartManager