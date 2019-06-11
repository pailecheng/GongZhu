import uuid, { UUID } from '../util/uuid'
import Room, { IRoom } from './room'
import Player, { IPlayer } from './player'

export interface IGame {
  ID: UUID
  rooms: IRoom[]
  $socket: SocketIO.Socket
}

class Game implements IGame {
  public ID = uuid()
  public rooms: IRoom[] = []
  public $socket: SocketIO.Socket

  constructor (socket: SocketIO.Socket) {
    this.$socket = socket
  }

  openRoom (): Room {
    const room = new Room(this.$socket)
    this.rooms.push(room)
    console.info('\n\n[ROOM]', '======================================================================')
    console.info('[ROOM]', `ID: ${room.ID}`)
    console.info('[ROOM]', '----------------------------------------------------------------------')

    return room
  }

  public joinRoom (playerName: IPlayer['name']): void {
    if (this.rooms.length === 0) {
      this.openRoom()
    }

    let targetRoom = this.rooms[this.rooms.length - 1]

    const player = new Player(playerName)
    targetRoom.join(player)
    this.$socket.join(targetRoom.ID)
    this.$socket.to(targetRoom.ID).emit('info', `${player.name} joined the room.`)
    console.info('[JOIN]', `${player.name} - ID: ${player.ID}`)

    if (targetRoom.playerList.length === 4) {
      targetRoom.ready()
      this.$socket.to(targetRoom.ID).emit('start', targetRoom.ID)
      console.info('[ROOM]', '======================================================================\n\n')
      this.openRoom()
    }
  }
}

export default Game
