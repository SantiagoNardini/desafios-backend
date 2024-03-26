const {config: {persistence, dbConnection}} = require('../config/config.js')

let ProductDao
let UserDao
let CartDao
let OrderDao

switch ('MONGO') {
    case 'MONGO':

        dbConnection() // 2 llamada a la conexión
        const ProductDaoMongo = require('./Mongo/productsManagerMongo.js')
        ProductDao = ProductDaoMongo

        const UserDaoMongo = require('./Mongo/userManagerMongo.js')
        UserDao = UserDaoMongo

        const OrderDaoMongo = require('./Mongo/ordersManagerMongo.js')
        OrderDao = OrderDaoMongo

        const CartDaoMongo = require('./Mongo/cartsManagerMongo.js')
        CartDao = CartDaoMongo
        
        break
    case 'MEMORY':
       
        break;
    case 'ARCHIVO':
        
        break;

    default:
        break;
}

module.exports = {
    ProductDao,
    UserDao,
    CartDao,
    OrderDao
}