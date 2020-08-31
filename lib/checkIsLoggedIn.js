const checkIsLoggedIn = (req, res, next) => {
    isLoggedIn = req.session.user
    console.log(req.session.cookie)

    if(isLoggedIn) next()
    else res.redirect('/login')
}

module.exports = checkIsLoggedIn