class ProductRepositories { // UserServices
    constructor(dao){
        this.dao = dao
    }

    async getProducts(objConfig){
        try {
            objConfig.limit = objConfig.limit &&  parseInt(objConfig.limit)
            objConfig.page  = objConfig.page  && parseInt(objConfig.page)
            objConfig.sort  = objConfig.sort  && parseInt(objConfig.sort)
            // console.log('objConfig: ',objConfig)
            return await this.dao.get(objConfig)            
        } catch (error) {
            return error
        }
    }

    async getProduct(pid){
        try {
            return await this.dao.getById(pid)
        } catch (error) {
            return error
        }
    }
    
    async createProduct(newProduct){
        try {            
            return await this.dao.create(newProduct)                         
        } catch (error) {
            return error
        }
    }

    async updateProduct(pid, updateProduct){
        try {
            return await this.dao.update(pid, updateProduct)
        } catch (error) {
            return error
        }
    } 

    async deleteProduct(pid){
        try {
            return await this.dao.remove(pid)
        } catch (error) {
            return error
        }
    }    

    async getProductStock(pid){
        try {
            return await this.dao.getById(pid)
        } catch (error) {
            
        }
    }

    async createTicket(newTicket){
        try {
            return await this.dao.create(newTicket)
        } catch (error) {
            return error
        }
    }

    async updateProductStock(pid, updateProduct){
        try {
            return await this.dao.update(pid, updateProduct)
        } catch (error) {
            return error
        }
    }
}

module.exports = ProductRepositories