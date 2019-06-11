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
  protected $socket: SocketIO.Socket

  constructor (socket: SocketIO.Socket) {
    this.$socket = socket
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

  public deal (players: IPlayer[]) {
    this.cardSets.forEach((card, index) => {
      players[index % 4].getCard(card)
    })
  }
}

export default Dealer
