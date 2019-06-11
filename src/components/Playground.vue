<template>
  <div>
    TEST
  </div>
</template>

<script>
export default {
  name: 'Playground',

  sockets: {
    connect () {
      console.log('socket connected')
    }
  }
}
</script>
