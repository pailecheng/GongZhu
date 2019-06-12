<template>
  <div class="playground">
    <header v-if="!gamming">
      <input type="text" v-model="player.name">
      <button @click="joinGame()">Join Game</button>
    </header>
    <div v-else-if="!start" class="msg-container">
      <p class="msg">Message: {{ msg }}</p>
    </div>
    <div
      v-if="cardStack"
      v-drag-and-drop:options="options"
      class="room"
    >
      <div class="stack">
        <Card
          v-for="card in roomStack"
          :key="card"
          :cardId="card"
          :roomId="room"
          :id="card"
          class="open"
          draggable="false"
        />
      </div>
      <Player
        v-for="(player, index) in otherPlayer"
        :key="`player-${index}`"
        :class="`player-${index + 1}`"
        :name="player.name"
        :cardLength="round === 0 ? cardStack.length : player.cardStackCount + player.archivedStackCount"
        :round="round"
        :yours="player.turn"
        :room="room"
        :playerFinal="playerFinal ? playerFinal[index] : null"
      />
      <div class="player player-self">
        <div
          :class="{ 'yours': playerFinal ? false : yours, 'final': playerFinal }"
          class="card-container"
        >
          <Card
            v-for="(card, index) in cardStack"
            :key="card"
            :cardId="card"
            :roomId="room"
            :class="{ 'dealing': index + 1 === cardStack.length && cardStack.length < 13, 'open': cardStack.length >= 13 - round }"
            class="draggable"
            :id="card"
            draggable="true"
          />
          <Card
            v-for="card in archivedCardStack"
            :key="card"
            :cardId="card"
            :roomId="room"
            :id="card"
            class="open archived"
            draggable="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './Card'
import Player from './Player'

export default {
  name: 'Playground',

  components: {
    Card,
    Player
  },

  data () {
    return {
      player: {
        id: '',
        name: ''
      },
      otherPlayer: [],
      room: '',
      round: 0,
      yours: false,
      msg: '',
      cardStack: '',
      archivedCardStack: [],
      roomStack: [],
      gamming: false,
      start: false,
      playerFinal: null,
      options: {
        dropzoneSelector: '.stack',
        draggableSelector: '.player-self>.card-container>.card.open.draggable',
        excludeOlderBrowsers: true,
        multipleDropzonesItemsDraggingEnabled: true,
        showDropzoneAreas: true,
        onDragend: this.dragHandling
      }
    }
  },

  mounted () {
    this.sockets.subscribe('INFO', data => {
      this.msg = data
    })

    this.sockets.subscribe('ID', data => {
      this.player = data
    })

    this.sockets.subscribe('START', data => {
      this.room = data.roomId
      this.otherPlayer = data.otherPlayer.filter(data => (this.player.id !== data.playerId))
      this.start = true
    })

    this.sockets.subscribe('CARD', data => {
      this.cardStack = data
    })

    this.sockets.subscribe('ARCHIVED_CARD', data => {
      this.archivedCardStack = data
    })

    this.sockets.subscribe('FINAL', data => {
      this.playerFinal = data.filter(data => (this.player.id !== data.playerId)).map(_ => (_.final))
    })

    this.sockets.subscribe('ROOM', data => {
      this.roomStack = data.roomStack
      this.otherPlayer = data.otherPlayer.filter(data => (this.player.id !== data.playerId))
      this.round = data.round
    })

    this.sockets.subscribe('YOU', _ => {
      this.yours = true
    })
  },

  methods: {
    joinGame () {
      this.$socket.emit('JOIN', this.player.name)
      this.gamming = true
    },

    dragHandling (event) {
      if (this.yours) {
        this.yours = false
        const selected = event.items[0]
        this.roomStack.push(selected.id)
        this.$socket.emit('SET', {
          roomId: this.room,
          playerId: this.player.id,
          cardId: selected.id
        })
      }
    }
  }
}
</script>
