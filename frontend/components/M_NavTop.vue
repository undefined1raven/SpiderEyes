
<script setup>
import VerticalLine from '@/components/VerticalLine.vue'
import HorizontalLine from '@/components/HorizontalLine.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BaseButton from '@/components/BaseLabel.vue'

import isMobile from '@/composables/isMobile.ts'
import percentage from '@/composables/percentage.ts'
import rangeScaler from '@/composables/rangeScaler.ts'
</script>

<script>
export default {
  props: {
    title: { default: '--' },
    hasOptions: { default: false },
    options: {
      default: () => {
        return [{ label: 'Senses' }, { label: 'y' }]
      },
    },
  },
  data() {
    return {
      isOptionOneEnabled: true,
    }
  },
  methods: {
    onDropdownMenuClick(){
      this.$emit('onDropdownMenuClick');
    },  
    optionButtonOnClick() {
      this.isOptionOneEnabled = !this.isOptionOneEnabled
    },
    optionButtonStyleController(buttonState, isReversed) {
      if (buttonState) {//Uses isReversed to control the styles of both buttons at the same time
        if (isReversed) {
          return { color: '#4D00AD' }
        } else {
          return { color: '#770AFF' }
        }
      } else {
        if (isReversed) {
          return { color: '#770AFF' }
        } else {
          return { color: '#4D00AD' }
        }
      }
    },
  },
}
</script>

<template>
  <div class="nav_top_container">
    <BaseLabel @onDropdownMenuClick="onDropdownMenuClick" clickEventName="onDropdownMenuClick" color="#770AFF" class="title_l" v-text="title"></BaseLabel>
    <HorizontalLine class="title_ln" color="#0500FF00"></HorizontalLine>
    <VerticalLine class="title_ln_1" color="#0500FF00"></VerticalLine>
    <BaseLabel
      clickEventName="optionButtonOnClick"
      @optionButtonOnClick="optionButtonOnClick"
      :style="`color: ${
        optionButtonStyleController(isOptionOneEnabled, false).color
      }; background-color: ${
        optionButtonStyleController(isOptionOneEnabled, false).color
      }20`"
      color="#770AFF"
      id="option_btn_0"
      class="option_btn"
      v-text="options[0].label"
    ></BaseLabel>
    <BaseLabel
      clickEventName="optionButtonOnClick"
      @optionButtonOnClick="optionButtonOnClick"
      :style="`color: ${
        optionButtonStyleController(isOptionOneEnabled, true).color
      }; background-color: ${
        optionButtonStyleController(isOptionOneEnabled, true).color
      }20`"
      color="#770AFF"
      id="option_btn_1"
      class="option_btn"
      v-text="options[1].label"
    ></BaseLabel>
    <HorizontalLine
      :color="optionButtonStyleController(isOptionOneEnabled, false).color"
      class="option_btn_indi_0"
    ></HorizontalLine>
    <HorizontalLine
      :color="optionButtonStyleController(isOptionOneEnabled, true).color"
      class="option_btn_indi_1"
    ></HorizontalLine>
    <VerticalLine class="title_dropdown_ln_0" color="#770AFF"></VerticalLine>
    <VerticalLine class="title_dropdown_p p0" color="#770AFF"></VerticalLine>
    <VerticalLine class="title_dropdown_p p1" color="#770AFF"></VerticalLine>
    <VerticalLine class="title_dropdown_p p2" color="#770AFF"></VerticalLine>
  </div>
</template>

<style scoped>
.p0{
  top: 37%;
}
.p1{
  top: 47%;
}
.p2{
  top: 57%;
}
.title_dropdown_p{
  width: 0.3vh;
  height: 0.3vh;
  left: 1.4%;
}
.title_dropdown_ln_0{
  top: 0%;
  left: 0%;
  height: 99%;
}
.option_btn_indi_0,
.option_btn_indi_1 {
  top: 72.565217391%;
  left: 42.5%;
  width: 18.333333333%;
  height: 0.2vh;
}
.option_btn_indi_1 {
  left: 74.722222222%;
}
#option_btn_0 {
  left: 36.111111111%;
}
#option_btn_1 {
  left: 68.333333333%;
}
.option_btn {
  width: 30.833333333%;
  height: 86.956521739%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4900a720;
  font-size: 2.6vh;
  z-index: 10;
  transition: all linear 0.1s;
  transition: color ease-out 0.2s;
  border-radius: 4px;
}
.title_ln_1 {
  background: radial-gradient(
    50% 50% at 50% 50%,
    #4900a7 0%,
    rgba(73, 0, 167, 0.15) 100%
  );
  height: 86.956521739%;
  width: 0.2vh;
  left: 35.277777778%;
}
.title_ln {
  background: radial-gradient(
    50% 50% at 50% 50%,
    #4900a7 0%,
    rgba(73, 0, 167, 0.15) 100%
  );
  width: 100%;
  top: 100%;
}
.title_l {
  font-size: 2.6vh;
  left: 0%;
  width: 35.277777778%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;;
}
.nav_top_container {
  position: absolute;
  top: 0;
  left: 0%;
  width: 100%;
  height: 7.1875%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
