import { Router } from "express"
const router = Router()

router.get('/session', (req, res)=> {
    if (req.session.counter) {
        req.session.counter++
        res.send(`Contador: ${req.session.counter} veces logueado.`)
    } else {
        req.session.counter = 1
        res.send('Primera vez logueado')
    }
})

router.get('/logout', (req, res)=> {
    req.session.destroy(error => {
        if (error) return res.send('Logout error')
        res.send({status: 'success', message: 'Logout success'})
    })
    
})

router.get('/setCookie', (req, res)=> {
    res.cookie('coderCookie', 'Esta es una cookie', {maxAge: 10000}).send('Cookie set')
})
router.get('/setCookieSigned', (req, res)=> {
    res.cookie('coderCookie', 'Esta es una cookie firmada', {maxAge: 10000, signed: true}).send('Cookie set')
})
router.get('/getCookieSigned', (req, res)=> {
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})
router.get('/getCookie', (req, res)=> {
    console.log(req.cookies)
    res.send(req.cookies)
})
router.get('/deleteCookie', (req, res)=> {
    
    res.clearCookie('coderCookie').send('Cookie eliminada')
})

router.get('/:parametro', (req, res)=> {
    res.send(req.params.parametro)
})

export default router