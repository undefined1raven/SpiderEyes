

<script>
export default {
  props: {
    readOnly: {default: false},
    width: { default: '7.251908397%' },
    height: { default: '2.830188679%' },
    defaultColor: { default: '#FFF' },
  },
  methods: {
    onNewColor(e) {
      this.$emit('colorUpdate', { color: e.target.value })
    },
    colorPickerOnClick() {
      if(!this.readOnly){ 
        this.$refs.picker.click()
      }
    },
    Color() {
      return this.color
    },
  },
  expose: ['Color'],
  data() {
    return {
      color: this.defaultColor,
    }
  },
}
</script>

<template>
    <div :style="`width: ${width}; height: ${height}`" class="color_picker_container">
        <input @input="onNewColor" ref="picker" class="color_picker_actual" v-model="color" type="color"></input>
        <div @click="colorPickerOnClick" :style="`background-color: ${color}`" class="color_picker_underlay"></div>
    </div>
</template>

<style scoped>
.color_picker_actual {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.color_picker_underlay {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  z-index: 5;
}
.color_picker_container {
  position: absolute;
}
</style>