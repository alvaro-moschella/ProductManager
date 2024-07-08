import CartManagerMongo from "../dao/cartsManagerMongo.js"
import ProductsManagerMongo from "../dao/productsManagerMongo.js"
import { UsersDaoMongo } from "../dao/usersDao.mongo.js"
import UserRepository from '../repositories/user.repository.js'
import ProductRepository from "../repositories/product.repository.js"
import CartRepository from "../repositories/cart.repository.js"

export const productService = new ProductRepository(new ProductsManagerMongo())
export const cartService = new CartRepository(new CartManagerMongo())
export const userService = new UserRepository(new UsersDaoMongo())