const db = require('../models')

const checkdb = async (req, res) => {
    try {
        await db.sequelize.authenticate()
        /* const user = await db.User.findByPk(1)
        res.send(user) */
        res.send('success')
    } catch (err) {
        res.send(err)
    }
}

module.exports = checkdb