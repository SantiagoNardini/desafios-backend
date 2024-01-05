import express from "express";
import ProductsRouter from "./routes/product.router.js"
import CartRouter from "./routes/cart.router.js"
import handlebars from "express-handlebars"
import __dirname from './utils.js';

const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

app.use('/api/products', ProductsRouter)
app.use('/api/carts', CartRouter)

let food = [
    {name: 'pizza', price: 1000},
    {name: 'hamburguesa', price: 2000},
    {name: 'papas fritas', price: 3000},
    {name: 'coca', price: 3000},
    {name: 'agua', price: 3000},
]

app.get('/', (req, res)=>{
    let testUser = {
        name: 'Cristian',
        last_name: 'Gonzalez',
        role: 'admin'
    }


res.render('index', {
    user: testUser,
    isAdmin:testUser.role === 'admin',
    food
})
})

app.listen(8080, ()=>{
    console.log('Escuchando en el puerto 8080')
} )
