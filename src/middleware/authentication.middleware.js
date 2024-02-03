export function auth (req, res, next) {
    console.log('middleware auth', req.session.user)
    if (req.session?.user.username === 'santi' && req.session?.user.admin) {
        return next()
    } else {
        res.status(401).send('Unauthorized')
    }
    
}