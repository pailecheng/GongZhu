import { UUID } from '../util/uuid'
import { IPlayer } from './player'
import { ICard } from './card'

export interface Room {
  ID: UUID
  size: number
  playerList: IPlayer[]
  cardStack: ICard[]
}
