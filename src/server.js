import http from 'http'

import app from './app.js'
import { init } from './socket.js'

const server = http.createServer(app)
const PORT = process.env.PORT || 8080

init(server)

server.listen(PORT, () => {
  console.log(`Escuchando el puerto ${PORT}`)
})