const express = require('express');
const app = express();
const ProductManager = require('./ProductManager');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const productManager = new ProductManager('./Products.txt');

app.get('/products', async (req, res) => {
    try {
      const products = await productManager.getProducts();
      const { limit } = req.query;
  
      if (limit) {
        const limitedProducts = products.slice(0, limit);
        res.json(limitedProducts);
      } else {
        res.json(products);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
      const products = await productManager.getProducts();
      const product = products.find((p) => {
      return p.id === parseInt(pid);
    });
    if (!product) {
      res.status(404).json({ error: "El producto no existe" });
    } else {
      res.json(product);
    }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  

app.listen(8080, ()=> {
    console.log('Server corriendo en el puerto 8080');
})