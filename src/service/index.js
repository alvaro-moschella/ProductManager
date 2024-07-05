import CartManagerMongo from "../dao/cartsManagerMongo.js"
import ProductsManagerMongo from "../dao/productsManagerMongo.js"

export const productService = new ProductsManagerMongo()
export const cartService = new CartManagerMongo()