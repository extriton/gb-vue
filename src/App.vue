<template>
  <DiceGame />
</template>

<script>
import DiceGame from '@/components/dice/DiceGame.vue'

export default {
  name: 'app',
  components: {
    DiceGame,
  }
}
</script>

<style lang="scss">
* {
  -moz-user-select: none;
  -webkit-user-select: none;
}
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-user-select: none;
  -webkit-user-select: none;
}
</style>
