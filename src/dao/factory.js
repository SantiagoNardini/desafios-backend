import connectDB, { configObject } from "../config/connectDB.js"

let UserDao
let ProductDao
let CartDao
let MessagesDao
let TicketDao

switch (configObject.persistence) {
    case 'MONGO':
        connectDB()
        const {default: UserManagerMongo} = await import('./Mongo/userManagerMongo.js')
        UserDao = UserManagerMongo

        const {default: ProductsManagerMongo} = await import('./Mongo/productsManagerMongo.js')
        ProductDao = ProductsManagerMongo

        const {default: CartDaoMongo} = await import('./Mongo/cartsManagerMongo.js')
        CartDao = CartDaoMongo

        const {default: MessagesManagerMongo} = await import('./Mongo/messagesManagerMongo.js')
        MessagesDao = MessagesManagerMongo

        const {default: TicketManagerMongo} = await import('./Mongo/ticketManagerMongo.js')
        TicketDao = TicketManagerMongo

        break;
    case 'MEMORY':
        const {default: ProductManagerFile} = await import('./FileSystem/productManagerFile.js')
        ProductDao = ProductManagerFile

        const {default: CartManagerFile} = await import('./FileSystem/cartManagerFile.js')
        CartDao = CartManagerFile
        break;
}

export { UserDao, ProductDao, CartDao, MessagesDao, TicketDao }
