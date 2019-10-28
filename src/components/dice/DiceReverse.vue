<template>
<div class="dice-reverse"
    @click="invertReverse">
    <i class="fa fa-exchange"></i>
</div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'DiceReverse',
    methods: {
        invertReverse () {
            this.INVERT_REVERSE()
        },
        ...mapMutations(['INVERT_REVERSE'])
    },
}
</script>

<style scoped lang="scss">
.dice-reverse {
    width: 50px;
    height: 50px;
    border: 5px solid #291944;
    border-radius: 100%;
    background-color: #3E2F57;
    color: #AAA;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    box-sizing: border-box;
    &:hover {
        cursor: pointer;
    }
}
</style>