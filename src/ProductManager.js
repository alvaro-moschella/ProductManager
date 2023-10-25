const fs = require('fs');
const { v4 : uuidV4 } = require('uuid');

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

    try {
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

    } catch (error) {
      throw new Error('Ocurrió un error al agregar un producto', error.message);
    }

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
      const existingProduct = products.find((product) => product.id === id);
    if (existingProduct) {
      console.log(existingProduct);
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
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    throw new Error('Producto no encontrado');
  }

  const updatedProduct = products[productIndex];

  if (title) {
    updatedProduct.title = title;
  }
  if (description) {
    updatedProduct.description = description;
  }
  if (code) {
    updatedProduct.code = code;
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
  try {
    const products = await this.getFile(this.path);
    const newProductsList = products.filter((product) => product.id !== id);

    if (newProductsList.length === products.length) {
      throw new Error('Producto no encontrado');
    }

    await this.saveFile(this.path, JSON.stringify(newProductsList));
    console.log(`Producto con id ${id} eliminado correctamente`);
  } catch (error) {
    throw new Error('Ocurrió un error', error.message);
  }
}

}
module.exports = ProductManager;

async function test(run) {
if (run) {
  const pm = new ProductManager('./Products.txt');
  await pm.getProducts();
  await pm.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
  //await pm.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc1234', 25);
  
  await pm.getProducts();

  //await pm.getProductById(1);// producto existente
  //await pm.getProductById(999);// producto inexistente - error
  
  //await pm.updateProduct(1, { title: 'titulo actualizado', description: 'descripcion actualizada'});
  await pm.getProducts();

  //await pm.deleteProduct(3);// eliminar producto que no existe - error
  //await pm.deleteProduct(1);// eliminar producto existente

// dejé comentados los métodos que devuelven error en los tests para que se ejecute todo hasta el final.
}

}

test(false);