import { Router } from 'express'
import ProductManager from '../ProductManager.js'
import CartManager from '../CartManager.js'
const router = Router()

const cartManager = new CartManager('src/carrito.json')
const productManager = new ProductManager('src/productos.json')


router.post('/', async (req, res) => {
    const newCart = await cartManager.addCart()
    res.status(201).send(newCart)
  })

router.get('/:cid', async (req, res) => {
  const { cid } = req.params
  try {
    const cart = await cartManager.getCartById(cid)
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

router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params

  try {
    const cart = await cartManager.getCartById(cid)
  if (!cart) {
    res.status(404).send({ error: "El carrito no existe" })
  } else {
    const product = await productManager.getProductById(pid)
    if (!product) {
      res.status(404).send({ error: "El producto no existe" })
    } else {

      const productIsInCart = cart.products.find(item => item.product === pid)

      if (productIsInCart) {
        productIsInCart.quantity += 1

} else {
  const newProduct = {
    "product": pid,
    "quantity": 1
  }
  cart.products.push(newProduct)
}
await cartManager.updateCarts(cart)
res.status(200).send(cart)
    }
  }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

export default router