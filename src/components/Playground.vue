<template>
  <div>
    <input type="text" v-model="playerName">
    <button @click="joinGame()">Join Game</button>
    Room: {{ room }}
  </div>
</template>

<script>
import uuid from 'uuid/v1'

export default {
  name: 'Playground',

  data () {
    return {
      playerName: '',
      room: ''
    }
  },

  sockets: {
    connect () {
      console.log('socket connected')
    }
  },

  methods: {
    joinGame () {
      const id = uuid()
      this.$socket.emit('JOIN', {
        name: this.playerName,
        id
      })
      this.sockets.subscribe(`PLAYER-${id}`, data => {
        this.setChannel(data.id)
      })
    },

    setChannel (id) {
      this.sockets.subscribe(`PLAYER-${id}`)
      this.sockets.subscribe('ROOM', data => {
        this.joinRoom(data)
      })
    },

    joinRoom (data) {
      this.sockets.unsubscribe('ROOM')
      this.sockets.subscribe(`ROOM-${data}`)
    }
  }
}
</script>
