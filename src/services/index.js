import { ProductDao, UserDao, CartDao } from "../dao/factory.js"
import ProductRepository from "./product.repository.js"
import UserRepository from "./user.repository.js"
import CartRepository from "./carts.repository.js"

const userService = new UserRepository(new UserDao())
const productService = new ProductRepository(new ProductDao())
const cartService = new CartRepository(new CartDao())


export { userService, productService, cartService }