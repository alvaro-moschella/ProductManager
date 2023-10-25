const express = require('express');
const app = express();
const PORT = 8080;

const productsRouter = require('./routers/products.router');
const cartsRouter = require('./routers/carts.router');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', productsRouter, cartsRouter);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT} 🚀`);
});