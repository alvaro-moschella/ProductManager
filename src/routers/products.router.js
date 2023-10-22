const { Router } = require('express');
const { v4 : uuidV4 } = require('uuid');
const ProductManager = require('../ProductManager');

const router = Router();
const productManager = new ProductManager(__dirname + '/../Products.txt');

router.get('/products', async (req, res) => {
    try {
      const products = await productManager.getProducts();
      const { limit } = req.query;
  
      if (limit) {
        const limitedProducts = products.slice(0, limit);
        res.status(200).json(limitedProducts);
      } else {
        res.json(products);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
      const products = await productManager.getProducts();
      const product = products.find((p) => {
      return p.id === parseInt(pid);
    });
    if (!product) {
      res.status(404).json({ error: "El producto no existe" });
    } else {
      res.status(200).json(product);
    }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.post('/products', async (req, res) => {
  const { body } = req;
  const newProduct = await productManager.addProduct(body);
  res.status(201).json(newProduct);
});

module.exports = router;