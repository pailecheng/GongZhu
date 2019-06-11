<template>
  <div>
    <input type="text" v-model="player.name">
    <button @click="joinGame()">Join Game</button>
    <p>Message: {{ msg }}</p>
    <img v-for="card in cardStack" :key="card" :src="`http://localhost:3000/img/card/${card}/${room}`" alt="">
  </div>
</template>

<script>
export default {
  name: 'Playground',

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
