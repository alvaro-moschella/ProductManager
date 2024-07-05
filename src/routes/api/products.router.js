import { Router } from 'express'
import { productListUpdated } from '../../socket.js'
import ProductManager from '../../dao/ProductManagerFS.js'
import { productsModel } from '../../models/products.model.js'
import ProductsManagerMongo from '../../dao/productsManagerMongo.js'
import { buildPaginatedResponse } from '../../utils/utils.js'
import ProductController from '../../controllers/products.controller.js'
const productManager = new ProductManager('productos.json')

const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = new ProductController()

const router = Router()

const productService = new ProductsManagerMongo()

router.get('/:pid', getProduct)

router.post('/', createProduct)

router.put('/:pid', updateProduct)

router.delete('/:id', deleteProduct)
  
export default router