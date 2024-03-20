import ProductsManagerMongo from "../dao/Mongo/productsManagerMongo.js"
import { productsModel } from "../dao/models/products.model.js"

export default class ViewController {
    constructor() {
        this.service = new ProductsManagerMongo()
    }

    getHome = async (req, res) => {
        const data = await this.service.getProducts()
        if (data) {
            res.render("home", { data })
        }
    }

    getRealTimeProducts = (req, res) => {
        res.render("realTimeProducts", {})
    }

    getChat = (req, res) => {
        res.render("chat", {})
    }

    getProducts = async (req, res) => {
        const { limit = 10, pageQuery = 1 } = req.query
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, page } = await productsModel.paginate({}, { limit, page: pageQuery, lean: true })
        console.log(page)
        res.render("products", { docs, hasPrevPage, hasNextPage, nextPage, prevPage, page })
    }

    getCarts = (req, res) => {
        res.render("carts", {})
    }

    getLogin = (req, res) => {
        res.render("login", {})
    }

    getRegister = (req, res) => {
		res.render("register", {})
    }
}