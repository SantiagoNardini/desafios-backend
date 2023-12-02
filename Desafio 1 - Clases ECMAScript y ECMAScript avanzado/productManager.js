class ProductManager {
    constructor() {
        this.products = []
    }
    getProducts = () => this.products

addProduct = (product) => {
    if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) 

    return "Enter all parameters"
    
    const productExist = this.products.findIndex(prod => prod.code === product.code)

    if(productExist !== -1) {
        return "The product with that code already exist"
    }

    if (this.products.length === 0) {
        product.id = 1
        this.products.push(product)
    } else {
        product.id = this.products.length + 1
        this.products.push(product)
    }

    return "Added product"
} 

getProductById = (pid) => {
    const product = this.products.find(product => product.id === pid)

    if (!product) return "Not found"

    return product
}
}

const products = new ProductManager()
console.log(products.addProduct({title:'Monitor 24', description:'es un monitor',price: 15, thumbnail:'https://monitor.jpg',code: 'abc123',stock: 1000}))
console.log(products.addProduct({title:'Cama', description:'es una cama',price: 15, thumbnail:'https://cama.jpg',code: 'cde321',stock: 1200}))
console.log(products.getProducts())
console.log(products.getProductById(2))


