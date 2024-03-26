function auth (req, res, next){
    console.log('auth: ',req.session)
    
    if (req.session?.user.name !== 'santiago' ) {
        return res.send('No estas autorizado para ver esta página, por favor')
    }
    
    return next()
}

module.exports = {
    auth
}