const express = require('express')
const app = express()
const portfinder = require('portfinder')
// Morgan
const morgan = require('morgan')
app.use(morgan('combined'))
// End Morgan

// View engine (Handlebars/hbs)
const expresshbs = require('express-hbs')
app.engine('hbs', expresshbs.express4({
    partialsDir: __dirname+'/views/components',
    defaultLayout: __dirname+'/views/layouts/default.hbs',
    layoutsDir: __dirname+'/views/layouts'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname+'/views/layouts')
// End View engine (Handlebars/hbs)

// Body parser
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: true}))
// End Body parser

// Express session
const session = require('express-session')
const sessionStore = require('express-session-sequelize')
const SessionStore = sessionStore(session.Store)
const db = require('./models')
const SequelizeSessionStore = new SessionStore({
    db: db.sequelize
})
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' },
    store: SequelizeSessionStore
    }))
// End Express session

// Express fileupload
const fileupload = require('express-fileupload')
app.use(fileupload({
    createParentPath: true,
    debug: true
}))
// End Express fileupload

// Route Start
const config = require('./config')
const checkIsLoggedIn = require('./lib/checkIsLoggedIn')
const login = require('./routes/login')
const users = require('./routes/users')
const dashboard = (req, res) => res.render('dashboard')
const logout = require('./lib/logout')

app.get('/', (req, res) => res.redirect('/login'))
app.get('/login', login.get)
app.post('/login', login.post)
app.get('/logout', logout)
app.get('/dashboard', checkIsLoggedIn, dashboard)
app.get('/users', users.create_get)
app.post('/users', users.create_post)
app.get('/users/:id', users.details)
app.use('/uploads', express.static('uploads'))
app.get('/test-db', require('./routes/checkdb'))
//Route End

// async menggunakan async await
const run = async () => {
    try {
        const port = await portfinder.getPortPromise({ port: config.port })
        app.listen(port, () => {console.log(`listening at port ${port}`)})
    } catch (err) {
        console.log(err)
    }
}
run()

// async menggunakan promise
/*   portfinder.getPortPromise({
    port: config
  })
    .then((port) => {
        app.listen(config.port, () => {})
    })
    .catch((err) => { console.log(err)}) */

