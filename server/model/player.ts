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
  public cardStack: ICard[]
  public score: number

  constructor (name: string, type: PlayerType) {
    this.name = name
    this.type = type
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
