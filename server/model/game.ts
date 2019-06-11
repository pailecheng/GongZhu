import uuid, { UUID } from '../util/uuid'
import Room, { IRoom } from './room'
import { IPlayer } from './player'

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
    this.$socket.emit('ROOM', room.ID)
    console.info('\n\n[ROOM]', '======================================================================')
    console.info('[ROOM]', `ID: ${room.ID}`)
    console.info('[ROOM]', '----------------------------------------------------------------------')

    return room
  }

  joinRoom (player: IPlayer): void {
    if (this.rooms.length === 0) {
      this.openRoom()
    }

    let targetRoom = this.rooms[this.rooms.length - 1]

    this.$socket.join(targetRoom.ID)
    console.info('[JOIN]', `${player.name} - ID: ${player.ID}`)
    targetRoom.join(player)

    if (targetRoom.playerList.length === 4) {
      console.info('[ROOM]', '======================================================================\n\n')
      this.openRoom()
    }
  }
}

export default Game
