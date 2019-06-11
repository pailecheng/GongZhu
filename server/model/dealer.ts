import uuid, { UUID } from '../util/uuid'
import Card, { ICard } from './card'
import Player from './player'

export interface IDealer {
  ID: UUID
  counter: number
  originCardSets: ICard[]
}

class Dealer implements IDealer {
  public ID = uuid()
  public counter = 0
  public originCardSets: ICard[]
  protected cardSets: ICard[]

  constructor () {
    this.originCardSets = this.generateCard()
    this.cardSets = this.shuffle(this.originCardSets)
  }

  private generateCard (): ICard[] {
    return Array(52).fill(0).map((_: void, index: number) => {
      return new Card(index)
    })
  }

  private shuffle (cardSets: ICard[]): ICard[] {
    return cardSets.sort(() => (Math.random()))
  }

  public deal (players: Player[]) {
    this.cardSets.forEach((card, index) => {
      players[index].getCard(card)
    })
  }
}

export default Dealer
