import Game from './model/game'
import Player, { IPlayer } from './model/player'
import { UUID } from './util/uuid'
import { IRoom } from './model/room';

export let game: Game

const initConnection = (socket: SocketIO.Socket) => {
  game = new Game(socket)
  socket.on('JOIN', playerJoin)
  socket.on('ROOM', (id: IRoom['ID'], payload) => {
    socket.to(id).emit(payload)
  })
}

const playerJoin = (data: IPlayer) => {
  const player = new Player(data.name, game.$socket, data.ID, data.type)
  game.joinRoom(player)
}

export {
  initConnection,
  playerJoin
}
