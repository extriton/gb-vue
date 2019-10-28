<template>
<div class="dice-game">
    <div class="dice-slider-wrapper">
        <DiceSlider />
    </div>
</div>
</template>

<script>
import DiceSlider from '@/components/dice/DiceSlider.vue'

export default {
  name: 'DiceGame',
  components: {
    DiceSlider,
  }
}
</script>

<style scoped lang="scss">
.dice-game {
    width: 100%;
    height: 100vh;
    background-color: #291944;
    padding: 100px 50px 50px 50px;
    box-sizing: border-box;
}
</style>