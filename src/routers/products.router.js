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

module.exports = router;