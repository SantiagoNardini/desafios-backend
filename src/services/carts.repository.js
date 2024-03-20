class CartRepository {
    constructor(cartDao) {
        this.dao = cartDao
    }

    getCarts = async () => await this.dao.getCarts()

    getCartById = async (cid) => await this.dao.getCartById(cid)

    addCart = async () => await this.dao.addCart()

    updateCart = async (cid, cart) => await this.dao.updateCart(cid, cart)

    addProductToCart = async (cid, pid, title, description, price, quantity = 1) => await this.dao.addProductToCart(cid, pid, title, description, price, quantity = 1)

    updateProductFromCart = async (cid, pid, quantity) => await this.dao.updateProductFromCart(cid, pid, quantity)

    deleteCart = async (cid) => await this.dao.deleteCart(cid)

    deleteProductFromCart = async (cid, pid) => await this.dao.deleteProductFromCart(cid, pid)

    purchaseCart = async (cid) => await this.dao.purchaseCart(cid)

}

export default CartRepository