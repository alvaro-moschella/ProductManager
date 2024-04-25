import fs from 'fs'
import crypto from 'crypto'

class CartManager {
  constructor(path) {
      this.products = []
      this.path = path
  }

  async addCart() {
    try {
      const carts = await this.readFile(this.path)
      const newCart = {
        id: crypto.randomUUID(),
        products: []
      }

      carts.push(newCart)

      await this.saveFile(this.path, JSON.stringify(carts, null, '\t'))
  
      console.log(`Carrito agregado correctamente con el id ${newCart.id}`)
      return newCart
    } catch (error) {
      throw new Error('Ocurrió un error al agregar un carrito', error.message)
    }
  }

  readFile = async () => {
        try {
            const content = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(content)
        } catch (error) {
            console.error('Error al leer el archivo:', error)
            return []
        }
      }
  
  saveFile = (path, data) => {
    return fs.promises.writeFile(path, data, 'utf-8')
  }

  async getCartById(id) {
    try {
      const carts = await this.readFile(this.path)
      const existingCart = carts.find((cart) => cart.id === id)
      if (existingCart) {
        return existingCart
      } else {
        throw new Error('Not found')
      }
    } catch (error) {
      throw new Error('Ocurrió un error al obtener el carrito', error.message)
    }
  }

  async updateCarts(updatedCart) {
    try {
      const carts = await this.readFile(this.path)
      const index = carts.findIndex((c) => c.id === updatedCart.id)
  
      if (index !== -1) {
        carts[index] = updatedCart
        await this.saveFile(this.path, JSON.stringify(carts))
  
        console.log(`Carrito actualizado correctamente con el id ${updatedCart.id}`)
      } else {
        throw new Error("No se encontró el carrito.")
      }
    } catch (error) {
      throw new Error("Error al actualizar el carrito.")
    }
  }
}
export default CartManager