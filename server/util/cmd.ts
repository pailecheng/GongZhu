import { IRoom } from '../model/room'
import { ICard } from '../model/card'
import { IPlayer } from '../model/player'
import { IDealer } from '../model/dealer';

export interface ISetCard {
  roomId: IRoom['ID']
  playerId: IPlayer['ID']
  cardId: ICard['ID']
}

export interface IOtherPlayer {
  playerId: IPlayer['ID']
  name: IPlayer['name']
  cardStackCount: number
  archivedStackCount: number
  turn: boolean
}

export interface IRoomStatus {
  roomStack: ICard['ID'][]
  otherPlayer: IOtherPlayer[]
  round: IDealer['counter']
}
