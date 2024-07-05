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

    async createProduct(newProduct) {
      return await this.productsModel.create(newProduct)
    }

    async updateProduct(pid, updateProduct){        
      return await this.productsModel.findByIdAndUpdate({_id: pid}, updateProduct, {new: true})        
  }

  async deleteProduct(pid){        
    await this.productsModel.deleteOne({_id: pid})        
}

}

export default ProductsManagerMongo