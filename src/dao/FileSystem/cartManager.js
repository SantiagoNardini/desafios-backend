import fileSystem from 'fs'
const {promises} = fileSystem
const fs = promises

class CartManagerFile {
    constructor() {
        this.path = './carts.json';
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
        try {
            const carts = await this.readFile()
            const cartIndex = carts.findIndex(cart => cart.id === cid)
            if (cartIndex === -1){
                return `El carrito con ID "${cid}" no existe`
            }
    
            const productIndex = carts[cartIndex].products.findIndex(prod => prod.id === pid)
            if (productIndex === -1){
                carts[cartIndex].products.push({
                    id: pid,
                    quantity: 1
                })
                console.log(carts[cartIndex])
            } else {
                carts[cartIndex].products[productIndex].quantity ++
            }
            
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
            return carts[cartIndex]
            
        } catch (error) {
            return error
        }
    }
}

export default CartManagerFile