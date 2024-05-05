import { Router } from 'express'
import ProductManager from '../ProductManager.js'
import { productListUpdated } from '../socket.js'
const router = Router()
import { __dirname } from '../utils.js'

const productManager = new ProductManager('productos.json')

router.get('/', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts()
        const productList = limit ? products.slice(0, limit) : products
        res.render('home', { productList })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts()
    res.render('realTimeProducts', { products })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

router.get('/chat', (req, res) => {
  res.render('index', {})
})


export default router