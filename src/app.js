import express from 'express'
import handlebars from 'express-handlebars'

import { __dirname } from './utils/utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import { sessionsRouter } from './routes/sessions.router.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import { initPassport } from './config/passport.config.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://admin:tNYclI4wo1nqG1Ge@cluster0.akju9kh.mongodb.net/ecommerce',
        mongoOption: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        ttl: 3600*1000*24
    }),
    secret: 's3cr3etC@d3r',
    resave: true,
    saveUninitialized: true
}))

initPassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('views', __dirname+'/views')
app.set('view engine', 'hbs')

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)

app.use('/', viewsRouter);

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
})

export default app