import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import ProductManager from './ProductManager.js';

let io;

export const init = (httpServer) => {
  io = new Server(httpServer);
  io.on('connection', async (socketClient) => {
    const productManager = new ProductManager(path.join(__dirname, './productos.json'));
    const products = await productManager.getProducts();
    socketClient.emit('product-list', products);
  });
};