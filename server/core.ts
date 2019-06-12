import Game from './model/game'
import { IPlayer } from './model/player'
import { ISetCard } from './util/cmd'
import { IRoom } from './model/room'

export const game = new Game()

const initConnection = (socket: SocketIO.Socket) => {
  socket.on('JOIN', (data: IPlayer['name']) => {
    game.joinRoom(data, socket)
  })

  socket.on('SET', (data: ISetCard) => {
    const room: IRoom = game.getRoom(data.roomId)
    const player: IPlayer = room.getPlayer(data.playerId)
    player.setCard(data.cardId, room.cardStack)
    room.dealer.judge(room)
    const roomMsg = room.sendStatus(data.playerId)
    socket.broadcast.emit('ROOM', roomMsg)
    socket.emit('ROOM', roomMsg)
    socket.emit('CARD', player.cardStack.map(card => (card.ID)))
  })
}

export {
  initConnection
}
