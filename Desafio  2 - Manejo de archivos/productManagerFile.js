const fileSystem = require ('node:fs')
const {promises} = fileSystem
const fs = promises

class ProductManagerFile {
    constructor(){
        this.path = 'database/Users.json'
}

readFileProducts = async () => {
    try {
        const productsJson = await fs.readFile(this.path, 'utf-8')
        return await JSON.parse(productsJson)
    } catch (error) {
        return []
    }
}

getProducts = async () => await this.readFileProducts()

getProductsById = async (pid) => {
    try {
        const products = await this.readFileProducts()
        let product = products.find(product => product.id === pid)
        if (!product) {
        return console.log("Product not found")
        } else {
        return console.log(product)
        }
    } catch (error) {
        console.log("Couldn't get product by id  " + error)
    }
}

addProduct = async ({title, description, price, thumbnail, code, stock}) => {
    try {
        if(!title || !description || !price || !thumbnail || !code || !stock) 
        return "Insert all parameters"

        const products = await this.readFileProducts()
        const productExist = products.findIndex(product => product.code === code) 

        if (productExist !== -1) return "The product with that code already exist"

        products.push({ title, description, price, thumbnail, code, stock, id: products.length + 1 })

        await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8') 

        return console.log("Added product")
    } catch (error) {
        console.log("Couldnt add product " + error)
    }
}

updateProduct = async (id, updatedFields) => {
    try {
        const products = await this.readFileProducts()
        const index = products.findIndex(product => product.id === id)
         if (index !== -1) {
             products[index] = { ...products[index], ...updatedFields, id };
             await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
             console.log("Updated product")
         } else {
             console.log("Product not found");
             return null;
        }
    } catch (error) {
        console.log("Error trying to update product " + error)
    }
}

deleteProduct = async (id) => {
    try {
        const products = await this.readFileProducts()

        const objectIdToBeRemoved = products.find((producto) => producto.id === id)

        if (objectIdToBeRemoved) {
        const index = products.indexOf(objectIdToBeRemoved)
        products.splice(index, 1)
        await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
        console.log("Product removed")
    }   else {
        console.log('ID ' + id + ' does not exist in the file')
        return null
    }
    } catch (error) {
        console.log("Error when trying to delete product with " + id + " ID " + error)
    } 
}
}

const productsFile = new ProductManagerFile()
const prod = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
}
const prod2 = {
    title: 'prod 2',
    description: 'esta es una descripción',
    price: 500,
    thumbnail: 'Sin imagen',
    code: "drp923",
    stock: 50
}
productsFile.addProduct(prod)
productsFile.addProduct(prod2)
productsFile.getProducts()
productsFile.getProductsById(2)
productsFile.updateProduct(2, { price: 800 })
// productsFile.deleteProduct(2)


