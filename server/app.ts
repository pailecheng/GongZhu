import express from 'express'
import cors from 'cors'
import SocketIO from 'socket.io'
import * as http from 'http'
import * as path from 'path'
import router from './router'
import { initConnection } from './core'

const app = express()
const httpServer = new http.Server(app)
const port = process.env.PORT || 3000
const io: SocketIO.Server = SocketIO(httpServer)

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000'],
  credentials: true
}))
app.set('port', port)
app.use(express.static(path.resolve(__dirname, '../client')))
app.use(router)

io.on('connection', initConnection)

httpServer.listen(port, () => {
  console.info('[Game Server]', `listen on localhost:${port}`)
})

export default httpServer
