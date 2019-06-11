import uuid, { UUID } from '../util/uuid'
import Room, { IRoom } from './room'
import Player, { IPlayer } from './player'

export interface IGame {
  ID: UUID
  rooms: IRoom[]
}

class Game implements IGame {
  public ID = uuid()
  public rooms: IRoom[] = []

  constructor () {
  }

  openRoom (): Room {
    const room = new Room()
    this.rooms.push(room)
    console.info('\n\n[ROOM]', '======================================================================')
    console.info('[ROOM]', `ID: ${room.ID}`)
    console.info('[ROOM]', '----------------------------------------------------------------------')

    return room
  }

  public joinRoom (playerName: IPlayer['name'], socket: SocketIO.Socket): void {
    if (this.rooms.length === 0) {
      this.openRoom()
    }

    let targetRoom = this.rooms[this.rooms.length - 1]

    const player = new Player(playerName, socket)
    targetRoom.join(player)
    socket.join(targetRoom.ID)
    socket.to(targetRoom.ID).emit('INFO', `${player.name} joined the room.`)
    console.info('[JOIN]', `${player.name} - ID: ${player.ID}`)

    if (targetRoom.playerList.length === 4) {
      targetRoom.ready()
      socket.to(targetRoom.ID).emit('START', targetRoom.ID)
      console.info('[ROOM]', '======================================================================\n\n')
      this.openRoom()
    }
  }
}

export default Game
