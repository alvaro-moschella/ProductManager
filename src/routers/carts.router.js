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
    res.status(200).json(cart);
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
    try {
      const products = await productManager.getProducts();
      const product = products.find((p) => {
      return p.id === parseInt(pid);
    });
    if (!product) {
      res.status(404).json({ error: "El producto no existe" });
    } else {

      console.log('cart esta', cart);
//const productInCart = cart.cart.products.find(item => item.product === pid);

const productInCart = cart.products.find(item => item.product === pid);

if (productInCart) {
  console.log('Producto encontrado:', productInCart);
} else {
  console.log('Producto no encontrado.');
  const newProduct = {
    "product": pid,
    "quantity": 1
  };
  cart.products.push(newProduct);
}
    }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  //fijarse si en el arreglo del cart esta el producto
  //si esta manejar el id
});

router.post('/carts', async (req, res) => {
  const newCart = await cartManager.addCart();
  res.status(201).json(newCart);
});

module.exports = router;