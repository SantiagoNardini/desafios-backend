import express from "express";
import ProductsRouter from "./routes/product.router.js"
import CartRouter from "./routes/cart.router.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

app.use('/api/products', ProductsRouter)
app.use('/api/carts', CartRouter)

app.listen(8080, ()=>{
    console.log('Escuchando en el puerto 8080')
} )
