const { productService, cartService, userService } = require('../services')
const { logger } = require("../middleware/logger")
const {faker} = require('@faker-js/faker')

class ViewsController {
    renderInicio = async (req, res) => {
        try {
            const products = [
                {title: 'Gorra rosa',  price: 400, imageUrl: 'https://cdn.palbincdn.com/users/31244/images/GORRA-BASICA-JUNIOR-CUSTOMIZASHOPBF10B-COLOR-ROSA-1611838353.jpg', category:'gorras'},
                {title: 'Gorra rosa',  price: 350, imageUrl: 'https://cdn.palbincdn.com/users/31244/images/GORRA-BASICA-JUNIOR-CUSTOMIZASHOPBF10B-COLOR-ROSA-1611838353.jpg', category:'gorras'},
                {title: 'Gorra rosa',  price: 300, imageUrl: 'https://cdn.palbincdn.com/users/31244/images/GORRA-BASICA-JUNIOR-CUSTOMIZASHOPBF10B-COLOR-ROSA-1611838353.jpg', category:'gorras'},
                {title: 'Gorra rosa',  price: 200, imageUrl: 'https://cdn.palbincdn.com/users/31244/images/GORRA-BASICA-JUNIOR-CUSTOMIZASHOPBF10B-COLOR-ROSA-1611838353.jpg', category:'gorras'},
                {title: 'Gorra rosa',  price: 150, imageUrl: 'https://cdn.palbincdn.com/users/31244/images/GORRA-BASICA-JUNIOR-CUSTOMIZASHOPBF10B-COLOR-ROSA-1611838353.jpg', category:'gorras'}
            ]
    
    
            let users = [{email: 'santiago@gmail.com', password:'123', role: 'admin'}]
            console.log('auth principal')
            let testUser = {
                name: 'Santiago',
                last_name: 'Nardini',
                role: 'admin',
            }
            // req.session.user = testUser.name
            // req.session.admin = true
            res.status(200).render('index', {
                user: testUser,
                isAdmin: testUser.role==='admin',
                products,
                showNav: true
                // style: 'index.css'
            })        
        } catch (error) {
            logger.info(error)
        }
    }
    renderProfile = async (req, res) => {
        try {            
            res.status(200).render('profile', {
                showNav: true
            })            
        } catch (error) {
            logger.error(error)
        }
    }
    
    renderCart = async (req, res) => {
        try {
            const {cid} = req.params
            
            const cart = await cartService.getCart(cid)
            console.log(cart.products)
            res.render('carts', {
                cart,
                showNav: true
            })        
        } catch (error) {
            logger.error(error)
        }
    }

    renderProducts = async (req, res) => {
        try {
            res.status(200).render('products', {
                showNav: true
            })        
        } catch (error) {
            logger.info(error)
        }
    }

    renderDetalle = async (req, res) => {
        try {
            const {pid} = req.params
            const product = await productService.getProduct(pid)
            res.render('detalle', {
                product,
                showNav: true
            })
        } catch (error) {
            logger.error(error)
        }
    }
    
    renderLogin            = async (req, res) => {
        try {
            res.status(200).render('login', {
                showNav: true
            })        
        } catch (error) {
            logger.info(error)
        }
    }
    renderRegister = async (req, res) => {
        try {
                
            res.status(200).render('register',{
                showNav: true
            })
        } catch (error) {
            logger.info(error)
        }
    }
    renderRealTimeProducts = async (req, res) => {
        try {
            // console.log('realtime products')
            // return  res.send('realtime')
            // const products = await Product.getProducts()
            res.render('realtimeproducts', {
                showNav: true
            })
        } catch (error) {
            console.log(error)
        }
    }

    generateProducts = () => {
        return {
            id: faker.database.mongodbObjectId(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            thumbnail: faker.image.avatar(),
            category: faker.commerce.department(),
            price: faker.commerce.price(),
        };
    };
    
    mockingProducts = async (req, res) => {
        let products = [];
        for (let i = 0; i < 100; i++) {
            products.push(this.generateProducts());
        }
        
        res.send({
            status: "",
            payload: products
        });
    };
}

module.exports = new ViewsController()