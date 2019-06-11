<template>
  <div class="card">
    <img :src="`http://localhost:3000/img/card/${cardId}/${roomId}`">
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
  }
}
</script>
