const { Router } = require('express');
const { v4 : uuidV4 } = require('uuid');
const path = require('path');
const CartManager = require('../CartManager');
const ProductManager = require('../ProductManager');

const router = Router();
const cartManager = new CartManager(path.join(__dirname, '../carrito.json'));
const productManager = new ProductManager(__dirname + '/../productos.json');

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

module.exports = router;