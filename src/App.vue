<template>
  <div id="app">
    <Playground />
  </div>
</template>

<script>
import components from '@/components'

export default {
  name: 'App',

  components: {
    ...components
  }
}
</script>

<style lang="scss">
@import './assets/scss/main.scss';
</style>
