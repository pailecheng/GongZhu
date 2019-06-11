import Game from './model/game'
import Player, { IPlayer } from './model/player'
import { UUID } from './util/uuid'

export let game: Game

const initConnection = (socket: SocketIO.Socket) => {
  game = new Game(socket)
  socket.on('JOIN', playerJoin)
}

const playerJoin = (playerName: IPlayer['name'], id: UUID, playerType: IPlayer['type']) => {
  const player = new Player(playerName, game.$socket, id, playerType)
  console.info('[Player Join]', `${player.name} - ID: ${player.ID}`)
  game.goWaitingList(player)
}

export {
  initConnection,
  playerJoin
}
