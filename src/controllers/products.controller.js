import { productService } from "../service/index.js"

class ProductController {
    constructor(){
        this.productService = productService
    }
    
   // getProducts   = () => {}
    getProduct    = async (req, res) => {
        const { pid } = req.params
        try {
            const product = await this.productService.getProductById(pid)
            res.status(200).send(product)
        } catch (error) {
          res.status(500).json('Error al buscar el producto')
        }
    }
    createProduct = async (req, res) => {
        const { body } = req
        let result = await this.productService.createProduct(body)

        if (!result) {
            return res.status(401).json({
                status: 'error',
                payload: 'El producto ya existe en la base de datos'
            })
        }
        res.status(201).json({
            status: 'success',
            payload: respuesta
        })
    }

    updateProduct = async (req, res) => {
        const { pid } = req.params
        const body = req.body
        try {
            const product = this.productService.updateProduct(pid, body)
            if (!product) {
                return res.status(401).json({
                    status: 'error',
                    payload: 'El producto no existe en la base de datos'
                })
            }
            res.status(200).json({
                status: 'success',
                payload: respuesta
            })
        } catch (error) {
          throw new Error('Ocurrió un error al actualizar el producto', error.message)
        }
    }
    deleteProduct = async (req, res) => {
        const { pid } = req.params
        try {
          await this.productService.deleteProduct(pid)
          res.status(204).send()
        }catch(error) {
          throw new Error('Ocurrió un error al eliminar un producto', error.message)
        } 
      }
}

export default ProductController