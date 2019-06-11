import uuid, { UUID } from '../util/uuid'
import Room, { IRoom } from './room'
import { IPlayer } from './player'

export interface IGame {
  ID: UUID
  rooms: IRoom[]
}

class Game implements IGame {
  public ID = uuid()
  public rooms: IRoom[]
  protected waitingPlayers: IPlayer[]
  protected $socket: SocketIO.Socket

  constructor (socket: SocketIO.Socket) {
    this.$socket = socket
  }

  openRoom (): void {
    const room = new Room(this.waitingPlayers)
    this.rooms.push(room)
  }

  goWaitingList (player: IPlayer): void {
    this.waitingPlayers.push(player)

    if (this.waitingPlayers.length === 4) {
      this.openRoom()
    }
  }

  clearWaitingList (): void {
    while (this.waitingPlayers.length > 0) {
      this.waitingPlayers.pop()
    }
  }
}

export default Game
