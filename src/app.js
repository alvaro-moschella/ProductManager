import express from 'express'
import ProductManager from './ProductManager.js'
const productManager = new ProductManager('Productos.json');

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    res.status(200).send('<h1>Product Manager</h1>')
})

app.get('/products', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts();
        const productList = limit ? products.slice(0, limit) : products
        res.status(200).send(productList);
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
});

app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productManager.getProductById(pid)
        res.status(200).send(product)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


app.listen(8080, error => {
    console.log('Escuchando el puerto 8080')
})