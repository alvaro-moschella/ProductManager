class ProductDTO {
    constructor(newProduct){
        this.title = newProduct.nombre
        this.description  = newProduct.description
        this.code      = newProduct.code
        this.price      = newProduct.price
        this.status      = newProduct.status
        this.stock      = newProduct.stock
        this.category      = newProduct.category
        this.thumbnails      = newProduct.thumbnails
    }
}

module.exports = ProductDTO