import ProductDTO from "../dto/product.dto.js"

export default class ProductRepository {
    constructor(productDao){
        this.productDao = productDao
    }

    getProducts = async () =>  await this.productDao.getProducts()
    getProductById = async pid =>  await this.productDao.getProductById(pid)
    createProduct = async (product) => {
        const newProduct = new ProductDTO(product)
        return await this.productDao.createProduct(newProduct)
    }
    updateProduct = async (pid, updateProduct) => await this.productDao.updateProduct(pid, updateProduct)
    deleteProduct = async pid => await this.productDao.deleteProduct(uid)
}