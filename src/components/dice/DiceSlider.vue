<template>
<div class="dice-slider">
    <div class="caption">
        <div class="caption-item"
            v-for="item in captionItems"
            :key="'c' + item"
            :style="setCaptionItemStyle(item)">
            {{ item }}
        </div>
    </div>
    <div class="rule-wrapper">
        <div class="runner"
            :class="{ dragged: drag }"
            :style="setRunnerStyle()"
            @mousedown.left="startDrag"
            @mousemove="doDrag"
            @mouseup.left="stopDrag"
            @mouseleave="stopDrag"
            v-html="runnerValue">
        </div>
        <div class="rule" @click.capture="shiftRunner">
            <div class="rule-item"
                v-for="item in 101"
                :key="'n' + item"
                :style="setRuleItemStyle(item)">
            </div>
        </div>
    </div>
    <div class="dice-reverse-wrapper">
        <DiceReverse />
    </div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import DiceReverse from '@/components/dice/DiceReverse.vue'

export default {
    name: 'DiceSlider',
    components: {
        DiceReverse,
    },
    data () {
        return {
            captionItems: [0, 25, 50, 75, 100],
            drag: false,
        }
    },
    methods: {
        setCaptionItemStyle (value) {
            const style = {
                left: value + '%',
            }
            return style
        },
        setRuleItemStyle (value) {
            const style = {
                left: `calc((100% - 3px) / 100 * ${value - 1})`,
                backgroundColor: '#50CC00',
            }

            if ((value < this.USER_VALUE + 1 && this.REVERSE) || (value > this.USER_VALUE + 1 && !this.REVERSE))
                style.backgroundColor = 'red'

            if (Math.abs(value - this.USER_VALUE - 1) <= 4)
                style.top = ((5 - Math.abs(value - this.USER_VALUE - 1)) * 25) + '%'
        
            return style
        },
        setRunnerStyle () {
            const style = {
                left: this.USER_VALUE + '%'
            }
            return style
        },
        startDrag () {
            this.drag = true
        },
        stopDrag () {
            this.drag = false
        },
        doDrag (e) {
            if (this.drag) {
                let newValue
                newValue = parseInt((e.offsetX + e.target.offsetLeft - e.target.offsetWidth/2) / e.target.parentNode.offsetWidth * 10000) / 100
                if (newValue < 0) newValue = 0
                if (newValue > 100) newValue = 100
                this.SET_USER_VALUE(newValue)
            }
        },
        shiftRunner (e) {
            let newValue, deltaValue, intervalId

            if (e.target._prevClass == 'rule-item')
                newValue = parseInt((e.offsetX + e.target.offsetLeft) / e.target.parentNode.offsetWidth * 10000) / 100
            else
                newValue = parseInt(e.offsetX / e.target.offsetWidth * 10000) / 100

            deltaValue = (newValue - this.USER_VALUE) / 20
            intervalId = setInterval(() => {
                if (this.USER_VALUE == newValue) {
                    clearInterval(intervalId)
                    return
                }
                if ((deltaValue > 0 && this.USER_VALUE + deltaValue > newValue) ||
                    (deltaValue < 0 && this.USER_VALUE + deltaValue < newValue))
                    this.SET_USER_VALUE(newValue)
                else
                    this.SET_USER_VALUE(this.USER_VALUE + deltaValue)
            }, 10)
        },
        ...mapMutations(['SET_USER_VALUE'])
    },
    computed: {
        runnerValue () {
            if (this.drag)
                return this.USER_VALUE
            else
                return '&lt;&nbsp;&nbsp;&nbsp;&gt;'
        },
        ...mapGetters(['USER_VALUE', 'REVERSE'])
    },
}
</script>

<style scoped lang="scss">
.dice-slider {
    width: 100%;
    min-width: 1000px;
    background-color: #1D1132;
    padding: 30px;
    box-sizing: border-box;
    border-radius: 5px;
    position: relative;
    .caption {
        position: relative;
        width: 100%;
        height: 20px;
        margin-bottom: 30px;
        .caption-item {
            position: absolute;
            display: inline-block;
            color: #3F3252;
            transform: translateX(-50%);
            &:last-child {
                transform: translateX(-100%);
            }
        }
    }
    .rule-wrapper {
        position: relative;
        .rule {
            position: relative;
            width: 100%;
            height: 20px;
            box-sizing: border-box;
            margin-bottom: 40px;
            &:hover {
                cursor: pointer;
            }
            .rule-item {
                width: 20px;
                position: absolute;
                top: 0;
                width: 3px;
                height: 20px;
                border-radius: 3px;
            }
        }
        .runner {
            position: absolute;
            top: -35px;
            width: 40px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            border-radius: 100%;
            background-color: #FFF;
            color: 291944;
            text-align: center;
            transform: translateX(-50%);
            &:hover, &.dragged {
                background-color: #FFEF00;
                cursor: pointer;
            }
        }
    }
    .dice-reverse-wrapper {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 50%);
    }
}
</style>