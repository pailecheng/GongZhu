import uuid, { UUID } from '../util/uuid'
import { IPlayer } from './player'
import { ICard } from './card'
import Dealer, { IDealer } from './dealer'
import { IRoomStatus } from '../util/cmd'

export interface IRoom {
  ID: UUID
  size: number
  playerList: IPlayer[]
  dealer: IDealer
  cardStack: ICard[]
  ready: Function
  join: Function
  getPlayer: Function
  sendStatus: Function
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

  public getPlayer (playerId: IPlayer['ID']): IPlayer {
    return this.playerList.filter(player => (player.ID === playerId))[0]
  }

  public sendStatus (playerId: IPlayer['ID']): IRoomStatus {
    return {
      roomStack: this.cardStack.map(card => (card.ID)),
      otherPlayer: this.playerList.map(data => {
        return {
          playerId: data.ID,
          name: data.name,
          cardStackCount: data.cardStack.length,
          archivedStackCount: data.archivedCard.length,
          turn: this.dealer.firstPlayer.ID === data.ID
        }
      }),
      round: this.dealer.counter
    }
  }
}

export default Room
