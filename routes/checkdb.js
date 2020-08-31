const checkdb = (req, res) => {
    const db = require('../models')
    db.sequelize.authenticate().then(
        () => res.send('connected'),
        () => res.send('error')
    )
}

module.exports = checkdb