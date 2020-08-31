const logout = (req, res) => {
    // req.session.user = undefined
    // req.session.save(() => redirect('/login'))
    // const sessionId = req.sessionId
    req.session.destroy(() => res.redirect('/login'))    
}

module.exports = logout