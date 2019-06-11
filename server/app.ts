import * as express from 'express'
import * as SocketIO from 'socket.io'
import * as cors from 'cors'
import * as http from 'http'
import * as path from 'path'
import router from './router'

const app = express()
const httpServer = new http.Server(app)
const io: SocketIO.Server = SocketIO(httpServer)
const port = process.env.PORT || 3000

app.use(cors())
app.set('port', port)
app.use(express.static(path.resolve(__dirname, '../client')))
app.use(router)

io.on('connection', (socket: any) => {
  console.log('connect')
})

httpServer.listen(port, () => {
  console.info('[Game Server]', `listen on localhost:${port}`)
})
