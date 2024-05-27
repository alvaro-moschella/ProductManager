import { Router } from 'express'
import ProductManager from '../dao/ProductManagerFS.js'
import { productListUpdated } from '../socket.js'
const router = Router()
import { __dirname, buildPaginatedResponse } from '../utils.js'
import ProductsManagerMongo from '../dao/productsManagerMongo.js'
import CartManagerMongo from '../dao/cartsManagerMongo.js'
import { auth } from '../middlewares/auth.middleware.js'

const cartService = new CartManagerMongo()
const productManager = new ProductManager('productos.json')

router.get('/', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
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

const productService = new ProductsManagerMongo()
router.get('/products', auth, async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query
  const criteria = {}
  const options = { limit, page }
  if (sort && (sort.toLowerCase() === 'asc' || sort.toLowerCase() === 'desc')) {
    options.sort = { price: sort }
  }
  if (query) {
    if (query.toLowerCase() === 'true' || query.toLowerCase() == 'false') {
      criteria.status = query
    } else {
      criteria.category = query
    }
  }
    try {
        const result = await productService.getProducts(criteria, options)
        const products = buildPaginatedResponse(result, sort, query)
        if(req.session?.user?.first_time){
          const userEmail = req.session.user ? req.session?.user?.email : null
          req.session.user.first_time = false
          res.render('products', { ...products, userEmail })
      }else{
          res.render('products', products)
      }
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message })
    }
})

router.get('carts/:cid', async (req, res) => {
  const { cid } = req.params
  try {
    const cart = await cartService.getCartBy({_id: cid})
    console.log('carrito', cart)
    if (!cart) {
        res.status(404).send({ error: "El carrito no existe" })
    } else {
        const cartProducts = { products: cart.products }
        res.status(200).send(cartProducts)
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})
export default router