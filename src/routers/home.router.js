import { Router } from 'express';
import ProductManager from '../ProductManager.js';
import path from 'path';
const router = Router();
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productManager = new ProductManager(path.join(__dirname, '../productos.json'));

router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const { limit } = req.query;

    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.render('home', { limitedProducts });
    } else {
      res.render('home', { products });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;