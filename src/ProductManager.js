import fs from 'fs';
import { v4 as uuidV4 } from 'uuid';

class ProductManager {

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct(body) {
    const { title, description, code, price, status = true, stock, category, thumbnails } = body;
    if (!title, !description, !code, !price, !status, !stock, !category) {
        throw new Error(`Todos los campos son obligatorios a excepción de 'thumbnails'.`);
    }

      const products = await this.getFile(this.path);
      const codeExists = products.map((product) => product.code).includes(code);
  
      if (codeExists) {
          throw new Error(`Ya existe un producto con el código ${code}.`);
      }
  
      const newProduct = {
        id: uuidV4(),
        ...body,
      };
      products.push(newProduct);
      await this.saveFile(this.path, JSON.stringify(products));
  
      console.log(`Producto agregado correctamente con el id ${newProduct.id}`);
      return newProduct;
  }

  async getProducts() {
    try {
        const products = await this.getFile(this.path);
        return products;
      } catch (error) {
        throw new Error('Ocurrió un error al obtener los productos', error.message);
      }
  }

  async getProductById(id) {
    try {
      const products = await this.getFile(this.path);
      const existingProduct = products.find((product) => product.id == id);
    if (existingProduct) {
      return existingProduct;
    } else {
      throw new Error('Not found');
    }
    } catch (error) {
      throw new Error('Ocurrió un error al obtener el producto', error.message);
    }
  }

  getFile = async (path) => {
    if (!fs.existsSync(path)) {
      return [];
    }
    const content = await fs.promises.readFile(path, 'utf-8');
    return JSON.parse(content);
  };
  
  saveFile = (path, data) => {
    return fs.promises.writeFile(path, data, 'utf-8');
  }

  async updateProduct(id, data) {
  const { title, description, code, price, status = true, stock, category, thumbnails } = data;
  const products = await this.getFile(this.path);
  const productIndex = products.findIndex((p) => p.id == id);

  if (productIndex === -1) {
    throw new Error('Producto no encontrado');
  }

  const updatedProduct = products[productIndex];

  if (code) {
    const codeExists = products.map((product) => product.code).includes(code);
    if (codeExists && products[productIndex].code !== code) {
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
  if (status) {
    updatedProduct.status = status;
  }
  if (stock) {
    updatedProduct.stock = stock;
  }
  if (category) {
    updatedProduct.category = category;
  }
  if (thumbnails) {
    updatedProduct.thumbnails = thumbnails;
  }

  products[productIndex] = updatedProduct;

  await this.saveFile(this.path, JSON.stringify(products));
  console.log('Producto actualizado correctamente');
  return updatedProduct;
}

async deleteProduct(id) {
  const products = await this.getFile(this.path);
  const newProductsList = products.filter((product) => product.id !== id);

  if (newProductsList.length === products.length) {
    throw new Error('Producto no encontrado');
  }

  await this.saveFile(this.path, JSON.stringify(newProductsList));
  console.log(`Producto con id ${id} eliminado correctamente`);
}

}
export default ProductManager;