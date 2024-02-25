import { Router } from "./sessions.router"
import UserRouter from "./user.router.js"
import cartRouter from "./cart.router.js"
import viewsRouter from "./views.router.js"
import sessionsRouter from "./sessions.router.js"
import pruebasRouter from "./pruebas.router.js"


const router = Router()
const usersRouter = new UserRouter()

router.use('/api/users', usersRouter.getRouter())


router.use('/', viewsRouter)
router.use('/pruebas', pruebasRouter)
router.use('/api/sessions', sessionsRouter)
// router.use('/api/users', usersRouter)
router.use('/api/carts', cartRouter)

router.get('*', (req, res)=>{
    res.send('not found')
})

export default router