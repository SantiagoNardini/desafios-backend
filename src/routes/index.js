const { Router } = require('express')
// rutas
// const usersRouter  = require('./users.router.js')
const viewsRouter    = require('./views.router.js')
const usersRouter    = require('./user.router.js')
const authRouter     = require('./sessions.router.js')
const productsRouter = require('./product.router.js')
const ordersRouter   = require('./orders.router.js')
const cartsRouter    = require('./cart.router.js')
const pruebasRouter  = require('./pruebas.router.js')
const errorHandler   = require('../middleware/error/index.js')
const CustomError = require('../utils/errors/CustomError.js')

const router = Router()

router.use('/',             viewsRouter.getRouter())
router.use('/session',      authRouter.getRouter())
router.use('/api/users',    usersRouter.getRouter())
router.use('/api/products', productsRouter.getRouter())
router.use('/api/orders',   ordersRouter.getRouter())
router.use('/api/carts',    cartsRouter.getRouter())
// router.use('/users',     userRouter.getRouter())
router.use('/pruebas',      pruebasRouter)

router.use('*', async (req, res)=>{
    res.status(404).json({
        mensaje: 'ruta no encontrada'
    })
})

router.use(errorHandler)

// router.use((err, req, res, next)=>{
//     console.log(err)
//     res.status(500).send('Todo mal')
// })

module.exports = {
    router
}