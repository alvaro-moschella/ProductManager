import { Router } from 'express'
import { productListUpdated } from '../socket.js'
import ProductManager from '../dao/ProductManagerFS.js'
import { productsModel } from '../models/products.model.js'
import ProductsManagerMongo from '../dao/productsManagerMongo.js'
import { buildPaginatedResponse } from '../utils.js'
const productManager = new ProductManager('productos.json')

const router = Router()

const productService = new ProductsManagerMongo()
router.get('/', async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query
  const criteria = {}
  const options = { limit, page }
  if (sort && (sort.toLowerCase() === 'asc' || sort.toLowerCase() === 'desc')) {
    options.sort = { price: sort }
  }
  if (query) {
    if (query.toLowerCase() === 'true' || query.toLowerCase() == 'false') {
      criteria.status = query
    } else {
      criteria.category = query
    }
  }
    try {
        const result = await productService.getProducts(criteria, options)
        const products = buildPaginatedResponse(result, sort, query)
        res.render('products', products)
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message })
    }
})

router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const product = await productService.getProductById(pid)
        res.status(200).send(product)
    } catch (error) {
      res.status(500).json('Error al buscar el producto')
    }
})
router.post('/', async (req, res) => {
    const { body } = req
    const result = await productsModel.create(body)
    res.status(201).send(result)
})

router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const { body } = req;
    try {
        const product = await productsModel.findByIdAndUpdate(pid, body)
        res.status(200).send(product)
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
      await productsModel.deleteOne({_id: id})
      const products = await productManager.getProducts()
      res.status(204).send()
    }catch(error) {
      throw new Error('Ocurrió un error al eliminar un producto', error.message)
    } 
  }
  )
  
export default router