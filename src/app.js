const express = require('express');
const app = express();
const PORT = 8080;

const productsRouter = require('./routers/products.router');
const cartsRouter = require('./routers/carts.router');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', productsRouter);

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
  

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT} 🚀`);
});