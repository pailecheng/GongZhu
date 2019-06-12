<template>
  <div class="card">
    <img :src="cardSrc">
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    cardId: {
      type: String
    },
    roomId: {
      type: String
    }
  },

  computed: {
    cardSrc () {
      return this.roomId ? `https://pig-game.aries0d0f.me/img/card/${this.cardId}/${this.roomId}` : 'https://pig-game.aries0d0f.me/img/card/covered'
    }
  }
}
</script>
