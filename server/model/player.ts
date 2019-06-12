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
  archivedCard?: ICard[]
  score?: number
  getCard: Function
  setCard: Function
  eatCard: Function
  socket: SocketIO.Socket
}

class Player implements IPlayer {
  public ID = uuid()
  public name: string
  public type: PlayerType
  public cardStack: ICard[] = []
  public archivedCard: ICard[] = []
  public score = 0
  public socket: SocketIO.Socket

  constructor (name: string, socket: SocketIO.Socket, type: PlayerType = 'Player') {
    this.name = name
    this.type = type
    this.socket = socket
  }

  public getCard (card: ICard): void {
    this.cardStack.push(card)
  }

  public setCard (cardId: ICard['ID'], targetStack: ICard[]): void {
    const selected = _.remove(this.cardStack, item => {
      return item.ID === cardId
    })[0]

    targetStack.push(selected)
  }

  public eatCard (originStack: ICard[]): void {
    originStack.forEach(card => {
      this.archivedCard.push(card)
    })

    this.socket.emit('ARCHIVED_CARD', this.archivedCard.map(card => (card.ID)))
  }
}

export default Player
