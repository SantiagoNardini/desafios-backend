const mongoose = require('mongoose')


class MongoSingleton {
    static #instance
    constructor() {
        mongoose.connect('mongodb://localhost:27017/ecommerce')
    }
    static getInstance() {
        if (this.#instance) {
            console.log("Base de datos previamente conectada")
            return this.#instance
        } 
    
        this.#instance = new MongoSingleton()
        console.log("Base de datos conectada")
        return this.#instance
    }
}





module.exports = MongoSingleton


// const mongoInstance = MongoSingleton.getInstance()
// const otherMongoInstance = MongoSingleton.getInstance()
// MongoSingleton.getInstance()