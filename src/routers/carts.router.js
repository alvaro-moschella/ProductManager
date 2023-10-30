import { Router } from 'express';
import { v4 as uuidV4 } from 'uuid';
import path from 'path';
import CartManager from '../CartManager.js';
import ProductManager from '../ProductManager.js';
import { fileURLToPath } from 'url';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cartManager = new CartManager(path.join(__dirname, '../carrito.json'));
const productManager = new ProductManager(path.join(__dirname, '../productos.json'));

router.get('/carts/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManager.getCartById(cid);
  if (!cart) {
    res.status(404).json({ error: "El carrito no existe" });
  } else {
    const cartProducts = { products: cart.products };
    res.status(200).json(cartProducts);
  }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/carts/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const cart = await cartManager.getCartById(cid);
  if (!cart) {
    res.status(404).json({ error: "El carrito no existe" });
  } else {
    const product = await productManager.getProductById(pid);
    if (!product) {
      res.status(404).json({ error: "El producto no existe" });
    } else {

      const productIsInCart = cart.products.find(item => item.product === pid);

      if (productIsInCart) {
        productIsInCart.quantity += 1;

} else {
  const newProduct = {
    "product": pid,
    "quantity": 1
  };
  cart.products.push(newProduct);
}
await cartManager.updateCarts(cart);
res.status(200).json(cart);
    }
  }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/carts', async (req, res) => {
  const newCart = await cartManager.addCart();
  res.status(201).json(newCart);
});

export default router;