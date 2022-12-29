
<script setup>
import VerticalLine from '@/components/VerticalLine.vue'
import HorizontalLine from '@/components/HorizontalLine.vue'
import SaveButtonDecoElement from '@/components/SaveButtonDecoElement.vue'
</script>

<script>
export default {
  props: {
    isActive: {default: true},
    numberOfSquares: {default: 56},
    numberOfcolumns: {default: 56},
    rate: { default: 900 },
    color: { default: '#4200ff' },
    width: {default: '4.166666667%'},
    height: {default: '5.277777778%'},
  },
}
</script>

<template>
  <div class="main_save_btn_deco_container" :style="`width: ${width}; height: ${height};`">
    <ul class="save_btn_deco_elm_list">
      <SaveButtonDecoElement
        :color="color"
        :rate="rate"
        :isActive="isActive"
        v-for="x in numberOfSquares"
        :key="x"
      ></SaveButtonDecoElement>
    </ul>
  </div>
</template>
<style scoped>
.save_btn_deco_elm_list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(6, 1fr);
}
.main_save_btn_deco_container {
  position: absolute;
}
</style>