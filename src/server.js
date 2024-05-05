import http from 'http'

import app from './app.js'
import { init } from './socket.js'
import pkg from './config/index.cjs';
const { connectDB } = pkg;

const server = http.createServer(app)
const PORT = process.env.PORT || 8080

init(server)
connectDB()

server.listen(PORT, error => {
  if (error) console.log(error)
  console.log(`Server escuchando el puerto ${PORT}`)
})