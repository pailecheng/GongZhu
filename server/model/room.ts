import uuid, { UUID } from '../util/uuid'
import { IPlayer } from './player'
import { ICard } from './card'
import Dealer, { IDealer } from './dealer'

export interface IRoom {
  ID: UUID
  size: number
  playerList: IPlayer[]
  dealer: IDealer
  cardStack: ICard[]
  ready: Function
  join: Function
}

class Room implements IRoom {
  public ID = uuid()
  public size: number
  public playerList: IPlayer[] = []
  public cardStack: ICard[] = []
  public dealer: IDealer

  constructor (size: number = 4) {
    this.size = size
    this.dealer = new Dealer()
  }

  public ready (): void {
    this.dealer.deal(this.playerList)
  }

  public join (player: IPlayer): void {
    this.playerList.push(player)
  }
}

export default Room
