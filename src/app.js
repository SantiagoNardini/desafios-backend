import express from "express";
import __dirname, { upload } from './utils.js';
import handlebars from "express-handlebars"
import ProductsRouter from "./routes/product.router.js"
import CartRouter from "./routes/cart.router.js"
import viewsRouter from "./routes/views.router.js"
import UserRouter from "./routes/user.router.js"
import MessageRouter from "./routes/messages.routes.js"
import pruebasRouter from "./routes/pruebas.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import { Server } from "socket.io";
import { manager } from "./dao/FileSystem/productManagerFile.js";
import connectDB from "./config/connectDB.js";
import logger from 'morgan';
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore from 'session-file-store'
import MongoStore from "connect-mongo";

const app = express()

connectDB()

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static( __dirname +'public'))
app.use(logger('dev'))
app.use(cookieParser('coderhouse'))

// const fileStore = FileStore(session);
// app.use(session({
//   store: new fileStore({
//     path: './sessions',
//     ttl: 100,
//     retries: 0
//   }),
//   secret: 'secretCoder',
//   resave: true,
//   saveUninitialized: true
// }))

const fileStore = FileStore(session);
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://CoderUser:1234@codercluster.v6fm1bm.mongodb.net/ecommerce',
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true},
    ttl: 60 * 60 * 1000 * 24
  }),
  secret: 'secretCoder',
  resave: true,
  saveUninitialized: true
}))

app.use('/', viewsRouter)
app.use('/api/products', ProductsRouter)
app.use('/api/carts', CartRouter)
app.use('/api/users', UserRouter)
app.use('/api/messages', MessageRouter)
app.use('/products', ProductsRouter)
app.use('/pruebas', pruebasRouter)
app.use('/sessions', sessionsRouter)

app.post('/file', upload.single('myFile'), (req, res) => {
  res.send("File uploaded successfully")
})

const httpServer = app.listen(8080, ()=>{
    console.log('Escuchando en el puerto 8080')
} )

const socketServer = new Server(httpServer)

socketServer.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado!");
    const data = await manager.getProducts();
    
    if (data) {
        socketServer.emit("resp-new-product", data);
    }
    socket.on("new-product", async (data) => {
      const result = await manager.addProduct(data);
      const products = await manager.getProducts();
      if (result) {
        socket.emit("resp-new-product", "Se agrego el producto");
      } 
      else if (products) {
        socketServer.emit("resp-new-product", products);
      }
      console.log(data);
    });
    socket.on("delete-product", async (id) => {
      const result = await manager.deleteProduct(parseInt(id));
      const products = await manager.getProducts();
      if (result) {
        socket.emit("resp-delete-product", "Se elimino el producto");
      } else if (products) {
            socketServer.emit("resp-delete-product", products);
      }
    });
  });

  let mensajes = []

  socketServer.on('connection', socket =>{
    console.log('cliente conectado')
   
    socket.on('message', data => {
        console.log(data)
        mensajes.push(data)

        io.emit('messageLogs', mensajes)
    })
  })