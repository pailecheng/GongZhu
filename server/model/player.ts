import uuid, { UUID } from '../util/uuid'
import _ from 'lodash'
import { ICard } from './card'

export type PlayerType =
  'Player' |
  'Bystander'

export interface IPlayer {
  ID: UUID
  name: string
  type: PlayerType
  cardStack?: ICard[]
  score?: number
}

class Player implements IPlayer {
  public ID = uuid()
  public name: string
  public type: PlayerType
  public cardStack: ICard[] = []
  public score = 0
  protected $socket: SocketIO.Socket

  constructor (name: string, socket: SocketIO.Socket, payloadId: UUID, type: PlayerType = 'Player') {
    this.name = name
    this.type = type
    this.$socket = socket
    this.$socket.emit(`PLAYER-${payloadId}`, {
      id: this.ID
    })
  }

  public getCard (card: ICard): void {
    this.cardStack.push(card)
  }

  public setCard (card: ICard, targetStack: ICard[]): void {
    const selected = _.remove(this.cardStack, (item) => {
      return item.ID === card.ID
    })[0]

    targetStack.push(selected)
  }
}

export default Player
