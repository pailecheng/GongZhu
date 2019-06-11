<template>
  <div>
    <input type="text" v-model="player.name">
    <button @click="joinGame()">Join Game</button>
    <p>Message: {{ msg }}</p>
    <div class="card-container">
      <Card
        v-for="card in cardStack"
        :key="card"
        :cardId="card"
        :roomId="room"
      />
    </div>
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'Playground',

  components: {
    Card
  },

  data () {
    return {
      player: {
        name: ''
      },
      room: '',
      msg: '',
      cardStack: ''
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
    }
  }
}
</script>
