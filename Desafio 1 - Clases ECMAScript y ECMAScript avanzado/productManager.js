const products = []

class ProductManager {
    constructor() {
        this.products = products
    }

addProduct = ({title, description, price, thumbnail, code, stock}) => {
    if(!title || !description || !price || !thumbnail || !code || !stock) 

    return "Enter all parameters"
    
    const productExist = this.products.findIndex(product => product.code === code)

    if(productExist !== -1) return "The product with that code already exist"

    this.products({title, description, price, thumbnail, code, stock, id:this.products.length + 1})

    return this.products
} 
 
getProducts = () => this.products

getProductById = (pid) => {
    const product = this.products.find(product => product.id === pid)

    if (!product) return "Not found"

    return product
}
}