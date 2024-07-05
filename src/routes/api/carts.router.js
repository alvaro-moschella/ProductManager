import { Router } from 'express'
import CartManagerMongo from '../../dao/cartsManagerMongo.js'
import CartController from '../../controllers/carts.controller.js'
const router = Router()
const cartService = new CartManagerMongo()

const {
  getCarts,
  getCart,
  createCart,
  updateCart
} = new CartController()

router.get('/', getCarts)
router.get('/:cid', getCart)
router.post('/', createCart)
router.post('/:cid/product/:pid', updateCart)

export default router