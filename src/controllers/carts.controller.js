import { cartService } from "../service/index.js"

class CartController {
    constructor(){
        this.cartService = cartService
    }

    getCarts = async (req, res) => {
        const carts = await this.cartService.getCarts()
        res.send(carts)
      }
    
    getCart = async (req, res) => {
        const { cid } = req.params
        try {
          const cart = await cartService.getCartBy({_id: cid})
          if (!cart) {
              return res.status(401).json({
                status: 'error',
                payload: 'El carrito no existe en la base de datos'
            })
          } else {
              const cartProducts = { products: cart.products }
              res.status(200).send(cartProducts)
          }
        } catch (error) {
            throw new Error('Ocurrió un error al buscar el carrito', error.message)
        }
      }
    createCart = async (req, res) => {
        try {
            const newCart = await cartService.createCart()
            res.status(201).send(newCart)
        } catch (error) {
            throw new Error('Ocurrió un error al crear el carrito', error.message)
        }
  }
        
    updateCart = async (req, res) => {
        const { cid, pid } = req.params
        try {
            const updatedCart = await cartService.updateCart(cid, pid)
            res.status(200).send(updatedCart)
        } catch (error) {
            throw new Error('Ocurrió un error al actualizar el carrito', error.message)
        }
      }
}

export default CartController