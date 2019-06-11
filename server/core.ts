import Game from './model/game'
import SocketIO from 'socket.io'
import Player, { IPlayer } from './model/player'
import httpServer from './app'

const io: SocketIO.Server = SocketIO(httpServer)
export let game: Game

io.on('connection', (socket: SocketIO.Socket) => {
  game = new Game(socket)
  socket.on('REGISTER', (playerName: IPlayer['name'], playerType: IPlayer['type']) => {
    const player = new Player(playerName, playerType)
    game.goWaitingList(player)
    console.info('[Player Join]', `${player.name} - ID: ${player.ID}`)
  })
})

