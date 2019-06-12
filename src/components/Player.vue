<template>
  <div class="player">
    <div class="card-container">
      <Card
        v-for="(card, index) in cardLength"
        :key="`${name}-${card}`"
        :class="{ 'dealing': index + 1 === cardLength && cardLength < 13, 'open': cardLength === 13 }"
      />
    </div>
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'Player',

  props: {
    name: {
      type: String
    },

    cardLength: {
      default: 0,
      type: Number
    }
  },

  components: {
    Card
  }
}
</script>
