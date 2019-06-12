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

    socket.join(targetRoom.ID)
    const player = new Player(playerName, socket)
    socket.broadcast.to(targetRoom.ID).emit('INFO', `${player.name} joined the room.`)
    socket.emit('ID', {
      id: player.ID,
      name: player.name
    })
    console.info('[JOIN]', `${player.name} - ID: ${player.ID}`)
    targetRoom.join(player)

    if (targetRoom.playerList.length === 4) {
      targetRoom.ready()
      targetRoom.playerList.forEach((player: IPlayer, index: number) => {
        player.socket.to(targetRoom.ID).emit('START', {
          roomId: targetRoom.ID,
          ...targetRoom.sendStatus(player.ID)
        })
      })
      console.info('[ROOM]', '======================================================================\n\n')
      this.openRoom()
    }
  }

  public getRoom (roomId: IRoom['ID']): IRoom {
    return this.rooms.filter(room => (room.ID === roomId))[0]
  }
}

export default Game
