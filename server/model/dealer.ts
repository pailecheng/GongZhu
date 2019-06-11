import uuid, { UUID } from '../util/uuid'
import Card, { ICard } from './card'
import { IPlayer } from './player'

export interface IDealer {
  ID: UUID
  counter: number
  originCardSets: ICard[]
  deal: Function
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
    return cardSets.sort(() => (Math.random() * 2 - 1))

  }

  public deal (players: IPlayer[]) {
    this.cardSets.forEach((card, index) => {
      setTimeout(() => {
        players[index % 4].getCard(card)
        players[index % 4].cardStack = players[index % 4].cardStack.sort((a, b) => {
          const suitIndex = ['Spade', 'Heart', 'Club', 'Diamond']
          return (suitIndex.indexOf(a.suit) + 1) * 13 + Math.floor(a.serialNum / 13) > (suitIndex.indexOf(b.suit) + 1) * 13 + Math.floor(b.serialNum / 13) ? 1 : -1
        })
        players[Math.abs(index % 4 - 3)].socket.to(players[index % 4].socket.client.id).emit('CARD', players[index % 4].cardStack.map(card => (card.ID)))
      }, index * 50)
    })
  }
}

export default Dealer
