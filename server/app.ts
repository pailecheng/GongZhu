import express from 'express'
import cors from 'cors'
import * as http from 'http'
import * as path from 'path'

import router from './router'

const app = express()
const httpServer = new http.Server(app)
const port = process.env.PORT || 3000

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000'],
  credentials: true
}))
app.set('port', port)
app.use(express.static(path.resolve(__dirname, '../client')))
app.use(router)

httpServer.listen(port, () => {
  console.info('[Game Server]', `listen on localhost:${port}`)
})

export default httpServer
