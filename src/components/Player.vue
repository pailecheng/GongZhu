<template>
  <div class="player">
    <div class="card-container">
      <Card
        v-for="card in 13"
        :key="`${name}-${card}`"
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
    }
  },

  components: {
    Card
  }
}
</script>
