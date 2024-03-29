import fs from 'fs'
import crypto from 'crypto'

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (!title, !description, !price, !thumbnail, !code, !stock) {
            throw new Error('Todos los campos son obligatorios.');
        }

        try {
          const products = await this.readFile(this.path);
          const codeExists = products.map((product) => product.code).includes(code);
  
        if (codeExists) {
            throw new Error(`Ya existe un producto con el código ${code}.`);
        }

        const newProduct = {
            id: crypto.randomUUID(),
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };

        products.push(newProduct);
        await this.saveFile(this.path, JSON.stringify(products, null, '\t'));

        console.log(`Producto agregado correctamente con el id ${newProduct.id}`);
        return;
        } catch (error) {
          console.error(error.message);
          return;
        }
    }

    async getProducts() {
        const products = await this.readFile(this.path);
        return products
    }

    async getProductById(id) {
        const products = await this.readFile(this.path);
        if (products.length === 0) {
            throw new Error('No hay productos cargados.');
        }
        const product = products.find((product) => product.id === id);
        if (!product) {
            throw new Error('Not found.');
        }
        return product
    }

    readFile = async () => {
        try {
            const content = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(content);
        } catch (error) {
            return [];
        }
      };

      saveFile = (path, data) => {
        return fs.promises.writeFile(path, data, 'utf-8');
      }

      async updateProduct(id, title, description, price, thumbnail, code, stock) {
        try {
          const products = await this.readFile(this.path);
          const productIndex = products.findIndex(p => p.id == id);
        
          if (productIndex === -1) {
            throw new Error('Producto no encontrado');
          }
        
          const updatedProduct = products[productIndex];
        
          if (code) {
            const codeExists = products.map((product) => product.code).includes(code);
            if (codeExists && products[productIndex].code === code) {
              throw new Error(`Ya existe un producto con el código ${code}.`);
            }
            updatedProduct.code = code;
          }
        
          if (title) {
            updatedProduct.title = title;
          }
          if (description) {
            updatedProduct.description = description;
          }
          if (price) {
            updatedProduct.price = price;
          }
          if (thumbnail) {
              updatedProduct.thumbnail = thumbnail;
          }
          if (code) {
            updatedProduct.code = code;
          }
          if (stock) {
            updatedProduct.stock = stock;
          }
          
          products[productIndex] = updatedProduct;
        
          await this.saveFile(this.path, JSON.stringify(products, null, '\t'));
          console.log('Producto actualizado correctamente');
          return;
        } catch (error) {
          console.error(error.message);
          return;
        }
      }

      async deleteProduct(id) {
        try {
          const products = await this.readFile(this.path);
          const newProductsList = products.filter((product) => product.id !== id);
        
          if (newProductsList.length === products.length) {
            throw new Error('Producto no encontrado');
          }
          await this.saveFile(this.path, JSON.stringify(newProductsList, null, '\t'));
          console.log(`Producto con id ${id} eliminado correctamente`);
        } catch (error) {
            console.error(error.message);
            return;
        }
      }
}

export default ProductManager;

//Pruebas
//Las pruebas son de antes de implementar crypto.randomUUID(), los ids ya no coinciden.
//const productManager = new ProductManager('./Productos.json');

//productManager.getProducts();
//productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
//productManager.updateProduct(1, 'titulo modificado', 'string', 23, null, 'abc1234');
//productManager.getProductById(1);
//productManager.deleteProduct(400);//id inexistente
//productManager.deleteProduct(1);
/*
productManager.getProductById(20);//id inexistente

productManager.addProduct("producto prueba con codigo repetido", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
productManager.addProduct("otro producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc1234", 25);
productManager.getProducts();
productManager.getProductById(1);//id existente
*/