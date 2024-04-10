import express from 'express'
import ProductManager from './ProductManager.js'
const productManager = new ProductManager('Productos.json');

import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    res.status(200).send('<h1>Product Manager Home</h1>')
})

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(8080, error => {
    console.log('Escuchando el puerto 8080')
})