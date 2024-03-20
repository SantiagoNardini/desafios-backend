class ProductRepository {
    constructor(productDao) {
        this.dao = productDao
    }

    getProducts = async () => await this.dao.getProducts()
    getProductById = async (pid) => await this.dao.getProductById(pid)
    addProduct = async (product) => await this.dao.addProduct(product)
    updateProduct = async (pid, product) => await this.dao.updateProduct(pid, product)
    deleteProduct = async (pid) => await this.dao.deleteProduct(pid)
}

export default ProductRepository