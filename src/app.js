import express from 'express'
import handlebars from 'express-handlebars'

import routerApp from './routes/index.js'

import { __dirname } from './utils/utils.js'
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
app.use(routerApp)

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('views', __dirname+'/../views')
app.set('view engine', 'hbs')

export default app