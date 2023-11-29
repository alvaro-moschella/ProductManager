import { Router } from 'express';
import ProductManager from '../ProductManager.js';
import { productListUpdated } from '../socket.js';
import path from 'path';
import productModel from '../models/product.model.js';
const router = Router();
import { fileURLToPath } from 'url';
import { buildPaginatedResponse } from '../utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productManager = new ProductManager(path.join(__dirname, '../productos.json'));

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const products = await productManager.getProducts();
    res.render('home', { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

  router.get('/products', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;
    const criteria = {};
    const options = { limit, page };
    if (sort && (sort.toLowerCase() === 'asc' || sort.toLowerCase() === 'desc')) {
      options.sort = { price: sort };
    }
    if (query) {
      criteria.category =  query;
    }
    const result = await productModel.paginate(criteria, options);
    const data = buildPaginatedResponse({ ...result, sort, query });
    res.render('products', { title: 'Listado de Productos', data });
  });

export default router;