import express from 'express'
import handlebars from 'express-handlebars'

import { __dirname } from './utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('views', __dirname+'/views')
app.set('view engine', 'hbs')

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.use('/', viewsRouter);

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
})

export default app