import { productsModel } from "../models/products.model.js"

class ProductsManagerMongo {
    constructor() {
      this.productsModel = productsModel;
    }

    async getProducts(criteria, options) {
        return await this.productsModel.paginate(criteria, options)
    }

    async getProductById(pid) {
      return await this.productsModel.findById(pid)
    }
}

export default ProductsManagerMongo