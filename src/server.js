import http from 'http'

import app from './app.js'
import { init } from './socket.js'
import {connectDB} from './config/index.js';

const server = http.createServer(app)
const PORT = process.env.PORT || 8080

init(server)
connectDB()

server.listen(PORT, error => {
  if (error) console.log(error)
  console.log(`Server escuchando el puerto ${PORT}`)
})