import { Server } from 'socket.io'
import { __dirname } from './utils.js'

import ProductManager from './ProductManager.js'

let io;

export const init = (httpServer) => {
  io = new Server(httpServer)
  let messages = []
  io.on('connection', async (socketClient) => {
    const productManager = new ProductManager('productos.json')
    const products = await productManager.getProducts()
    socketClient.emit('client-connected')
    socketClient.emit('product-list', products)

    socketClient.on('message', data => {
      console.log('message data: ', data)
      messages.push(data)

      io.emit('messageLogs', messages)
    })
  })
}

export const productListUpdated = (products) => {
  io.emit('product-list', products)
}