import Game from './model/game'
import { IPlayer } from './model/player'
import { IRoom } from './model/room'

export const game = new Game()

const initConnection = (socket: SocketIO.Socket) => {

  socket.on('JOIN', (data: IPlayer['name']) => {
    game.joinRoom(data, socket)
  })
}

export {
  initConnection
}
