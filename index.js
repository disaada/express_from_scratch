const express = require('express')
const app = express()
const portfinder = require('portfinder')

const config = require('./config')
const checkIsLoggedIn = require('./lib/checkIsLoggedIn')

app.get('/', (req, res) => res.redirect('/login'))
app.get('/login', require('./routes/login'))
app.get('/dashboard', checkIsLoggedIn, require('./routes/dashboard'))
app.get('/test-db', require('./routes/checkdb'))
 
  portfinder.getPortPromise({
    port: config
  })
    .then((port) => {
        app.listen(config.port, () => {})
    })
    .catch((err) => { console.log(err) })

