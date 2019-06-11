import * as express from 'express'
import * as path from 'path'

import { game } from './core'
import { UUID } from './util/uuid'
import { IRoom } from './model/room'
import { ICard } from './model/card'


const router = express.Router()

router
  .get('/:room/card/:id', (req: express.Request, res: express.Response): void => {
    try {
      const roomId: UUID = req.params.room
      const cardId: UUID = req.params.id
      const targetRoom: IRoom = game.rooms.filter((room) => (roomId === room.ID))[0]
      const targetCard: ICard = targetRoom.dealer.originCardSets.filter((card) => (cardId === card.ID))[0]

      res.status(200)
      res.sendFile(path.resolve(__dirname, `./public/img/${targetCard.serialNum}.gif`))

    } catch (error) {
      res.status(404)
      res.send(error)
      throw new Error(error)
    }
  })

export default router
