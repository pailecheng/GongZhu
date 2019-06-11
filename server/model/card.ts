import uuid, { UUID } from '../util/uuid'

export type CardSuit =
  'Spade' |
  'Heart' |
  'Diamond' |
  'Club'

export type CardNo =
  'A' |
  '2' |
  '3' |
  '4' |
  '5' |
  '6' |
  '7' |
  '8' |
  '9' |
  '10' |
  'J' |
  'Q' |
  'K'

export interface ICard {
  ID: UUID
  suit: CardSuit
  no: CardNo
  serialNum: number
}

class Card implements ICard {
  public ID = uuid()
  public suit: CardSuit
  public no: CardNo
  public serialNum: number

  protected suitPair: CardSuit[] = [
    'Spade',
    'Heart',
    'Diamond',
    'Club'
  ]

  protected noPair: CardNo[] = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K'
  ]

  constructor (serialNum: number) {
    this.suit = this.suitPair[Math.floor(serialNum / 13)]
    this.no = this.noPair[serialNum % 13]
    this.serialNum = serialNum + 1
  }
}

export default Card
