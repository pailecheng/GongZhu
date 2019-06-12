import uuid, { UUID } from '../util/uuid'
import Card, { ICard } from './card'
import { IPlayer } from './player'
import { IRoom } from './room';

export interface IDealer {
  ID: UUID
  counter: number
  originCardSets: ICard[]
  deal: Function
  judge: Function
  firstPlayer: IPlayer
}

class Dealer implements IDealer {
  public ID = uuid()
  public counter = 0
  public originCardSets: ICard[]
  public firstPlayer: IPlayer
  protected firstPlayerIndex: number
  protected cardSets: ICard[]
  protected judgeStand = [ 'A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2' ]

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

  public deal (players: IPlayer[]): void {
    this.cardSets.forEach((card, index) => {
      setTimeout(() => {
        players[index % 4].getCard(card)
        players[index % 4].cardStack = players[index % 4].cardStack.sort((a, b) => {
          const suitIndex = ['Spade', 'Heart', 'Club', 'Diamond']
          return (suitIndex.indexOf(a.suit) + 1) * 100 + Math.floor((a.serialNum - 1) % 13) > (suitIndex.indexOf(b.suit) + 1) * 100 + Math.floor((b.serialNum - 1) % 13) ? 1 : -1
        })
        players[Math.abs(index % 4 - 3)].socket.to(players[index % 4].socket.client.id).emit('CARD', players[index % 4].cardStack.map(card => (card.ID)))
      }, index * 50)
    })

    this.firstPlayerIndex = this.cardSets.map(_ => (`${_.suit}-${_.no}`)).indexOf('Spade-7') % 4
    this.firstPlayer = players[this.firstPlayerIndex]
    this.firstPlayer.socket.emit('YOU', '')
  }

  public judge (room: IRoom): void {
    if (room.cardStack.length === 1) {
      this.counter += 1
    }

    if (room.cardStack.length === 4) {
      this.firstPlayerIndex = room.cardStack.map((card, index) => ({
        score: this.judgeStand.indexOf(card.no),
        playerIndex: (index + this.firstPlayerIndex + 1) % 4
      })).sort((a, b) => (a.score > b.score ? 1 : -1))[0].playerIndex

      this.firstPlayer = room.playerList[this.firstPlayerIndex]
      this.firstPlayer.eatCard(room.cardStack)
      room.cardStack = []

      const roomMsg = room.sendStatus()
      this.firstPlayer.socket.broadcast.emit('ROOM', roomMsg)
      this.firstPlayer.socket.emit('ROOM', roomMsg)
      this.firstPlayer.socket.emit('YOU', '')

      if (this.counter === 13) {
        this.firstPlayer.socket.broadcast.emit('FINAL', room.playerList.map(player => ({
          playerId: player.ID,
          final: player.archivedCard.map(card => (card.ID))
        })))
        this.firstPlayer.socket.emit('FINAL', room.playerList.map(player => ({
          playerId: player.ID,
          final: player.archivedCard.map(card => (card.ID))
        })))
      }
    } else {
      this.firstPlayerIndex = (this.firstPlayerIndex + 1) % 4
      this.firstPlayer = room.playerList[this.firstPlayerIndex]
      this.firstPlayer.socket.emit('YOU', '')
    }
  }
}

export default Dealer
