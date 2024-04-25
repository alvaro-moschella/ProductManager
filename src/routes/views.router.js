import { Router } from 'express'
import ProductManager from '../ProductManager.js'
import { productListUpdated } from '../socket.js'
const router = Router()
import { __dirname } from '../utils.js'

const productManager = new ProductManager('productos.json')

router.get('/', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts()
        const productList = limit ? products.slice(0, limit) : products
        res.render('home', { productList })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    console.log('productos',products)
    res.render('realTimeProducts', { products });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
  const newProduct = await productManager.addProduct(req.body)
  const products = await productManager.getProducts();
  productListUpdated(products);
  res.status(201).send(newProduct);
  } catch (error) {
    console.error(error);
  }
  });

  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await productManager.deleteProduct(id);
      const products = await productManager.getProducts();
      productListUpdated(products);
      res.status(204);
    }catch(error) {
      throw new Error('Ocurrió un error al eliminar un producto', error.message);
    } 
  }
  );

export default router;