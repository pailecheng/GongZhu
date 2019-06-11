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
}

class Room implements IRoom {
  public ID = uuid()
  public size: number
  public playerList: IPlayer[]
  public cardStack: ICard[]
  public dealer: IDealer

  constructor (players: IPlayer[], size = 4) {
    this.size = size
    this.playerList = players
    this.dealer = new Dealer()
  }
}

export default Room
