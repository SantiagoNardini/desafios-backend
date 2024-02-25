export function auth (req, res, next) {
    console.log('middleware auth', req.session.user)
    if (req.session?.user?.email && req.session?.user?.role) {
        return next()
    } else {
        res.status(401).send('Unauthorized')
    }
    
}