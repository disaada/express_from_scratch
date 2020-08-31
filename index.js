const express = require('express')
const app = express()
const portfinder = require('portfinder')
const morgan = require('morgan')

const config = require('./config')
const checkIsLoggedIn = require('./lib/checkIsLoggedIn')

/* app.use('morgan') */

app.get('/', (req, res) => res.redirect('/login'))
app.get('/login', require('./routes/login'))
app.get('/dashboard', checkIsLoggedIn, require('./routes/dashboard'))
app.get('/test-db', require('./routes/checkdb'))

// async menggunakan async await
const run = async () => {
    try {

        const port = await portfinder.getPortPromise({ port: config.port })
    
        app.listen(port, () => {})

    } catch (err) {

        console.log(err)
    
    }
    
}

// async menggunakan promise
/*   portfinder.getPortPromise({
    port: config
  })
    .then((port) => {
        app.listen(config.port, () => {})
    })
    .catch((err) => { console.log(err)}) */

