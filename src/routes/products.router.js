import { Router } from 'express'
import ProductManager from '../ProductManager.js'
const productManager = new ProductManager('Productos.json');

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

export default router