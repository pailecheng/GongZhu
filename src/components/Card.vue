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
      return this.roomId ? `http://localhost:3000/img/card/${this.cardId}/${this.roomId}` : 'http://localhost:3000/img/card/covered'
    }
  }
}
</script>
