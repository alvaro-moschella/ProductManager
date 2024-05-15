import { Router } from 'express'
import CartManagerMongo from '../dao/cartsManagerMongo.js'
const router = Router()
const cartService = new CartManagerMongo()

router.get('/', async (req, res) => {
  const carts = await cartService.getCarts()
  res.send(carts)
})

router.post('/', async (req, res) => {
    const newCart = await cartService.createCart()
    res.status(201).send(newCart)
  })

router.get('/:cid', async (req, res) => {
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

router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params
  const updatedCart = await cartService.updateCart(cid, pid)
  res.status(200).send(updatedCart)
})

export default router