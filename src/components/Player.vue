<template>
  <div class="player">
    <div
      :class="{ 'yours': playerFinal ? false : yours }"
      class="card-container"
    >
      <Card
        v-for="(card, index) in cardLength"
        :key="`${name}-${card}`"
        :class="{ 'dealing': index + 1 === cardLength && cardLength < 13, 'open': cardLength >= 13 - round }"
        :cardId="playerFinal ? playerFinal[index] : null"
        :roomId="playerFinal ? room : null"
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
    },

    round: {
      default: 0,
      type: Number
    },

    yours: {
      default: false,
      type: Boolean
    },

    playerFinal: {
      default: null,
      type: Array
    },

    room: {
      default: null,
      type: String
    }
  },

  components: {
    Card
  }
}
</script>
