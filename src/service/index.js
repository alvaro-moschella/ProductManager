import CartManagerMongo from "../dao/cartsManagerMongo.js"
import ProductsManagerMongo from "../dao/productsManagerMongo.js"
import { UsersDaoMongo } from "../dao/usersDao.mongo.js"

export const productService = new ProductsManagerMongo()
export const cartService = new CartManagerMongo()
export const userService = new UsersDaoMongo()