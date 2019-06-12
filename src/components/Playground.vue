<template>
  <div class="playground">
    <header v-if="!gamming">
      <input type="text" v-model="player.name">
      <button @click="joinGame()">Join Game</button>
    </header>
    <div v-else class="msg-container">
      <p class="msg">Message: {{ msg }}</p>
    </div>
    <div v-if="cardStack" class="room">
      <Player
        v-for="player in 3"
        :key="`player-${player}`"
        :class="`player-${player}`"
        :cardLength="cardStack.length"
      />
      <div class="player player-self">
        <div class="card-container">
          <Card
            v-for="(card, index) in cardStack"
            :key="card"
            :cardId="card"
            :roomId="cardStack.length === 13 ? room : null"
            :class="{ 'dealing': index + 1 === cardStack.length && cardStack.length < 13, 'open': cardStack.length === 13 }"
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
        name: ''
      },
      room: '',
      msg: '',
      cardStack: '',
      gamming: false
    }
  },

  mounted () {
    this.sockets.subscribe('INFO', data => {
      this.msg = data
    })

    this.sockets.subscribe('START', data => {
      this.room = data
    })

    this.sockets.subscribe('CARD', data => {
      this.cardStack = data
    })
  },

  methods: {
    joinGame () {
      this.$socket.emit('JOIN', this.player.name)
      this.gamming = true
    }
  }
}
</script>
