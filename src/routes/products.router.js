import { Router } from 'express'
import ProductManager from '../ProductManager.js'
const productManager = new ProductManager('src/productos.json');

const router = Router()

router.get('/', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts();
        const productList = limit ? products.slice(0, limit) : products
        res.status(200).send(productList);
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productManager.getProductById(pid)
        res.status(200).send(product)
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { body } = req;
        const newProduct = await productManager.addProduct(body);
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const { body } = req;
    try {
        const product = await productManager.updateProduct(pid, body)
        res.status(200).send(product)
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
});

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
      const deletedProduct = await productManager.deleteProduct(pid);
      res.status(204).json(deletedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router