const bycrypt = require('bcrypt')
const db = require('../models')

const get = (req, res) => res.render('login')

const post = async (req, res) => {
    try {
        const { username, password } = req.body
        const User = await db.User.findOne({ where: {name: username} })
        if(User && bycrypt.compareSync(password, User.password)) {
            req.session.user = User
            req.session.save(() => res.redirect('/dasboard'))
            res.send('success login')
        }
        else res.send('failed login')
    } catch (err) {
        res.send(err)
    }
    
}

module.exports = {
    get,
    post
}