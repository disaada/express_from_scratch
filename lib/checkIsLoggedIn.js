const checkIsLoggedIn = (req, res, next) => {
    isLoggedIn = false
    if(isLoggedIn) next()
    else res.redirect('/login')
}

module.exports = checkIsLoggedIn