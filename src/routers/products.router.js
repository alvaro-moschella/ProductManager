import { Router } from 'express';
import { v4 as uuidV4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import ProductManager from '../ProductManager.js';
import productModel from '../models/product.model.js';
import { buildPaginatedResponse } from '../utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const productManager = new ProductManager(path.join(__dirname, '../productos.json'));

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
  res.status(200).json(buildPaginatedResponse(result, sort, query));
});

  router.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
      const product = await productManager.getProductById(pid);
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

router.put('/products/:pid', async (req, res) => {
  const { pid } = req.params;
  const { body } = req;

  try {
    const updatedProduct = await productManager.updateProduct(pid, body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/products/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    const deletedProduct = await productManager.deleteProduct(pid);
    res.status(204).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;