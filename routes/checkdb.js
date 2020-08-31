const db = require('../models')

const checkdb = (req, res) => {

    db.sequelize.authenticate().then(
        async () => {
            const user = await db.User.findByPk(1)
            res.send(user)
        },
        () => res.send('error')
    )

}

module.exports = checkdb