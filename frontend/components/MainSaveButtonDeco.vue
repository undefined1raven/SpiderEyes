
<script>
export default {
  props: {
    isActive: { default: true },
    rate: { default: 900 },
    color: { default: '#4200ff' },
  },
  data() {
    return {
      bkg: `${this.color}20`,
    }
  },
  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min) + min) //max e | min i
    },
    genColor() {
      if (this.isActive) {
        return `#770AFF${this.getRandomInt(10, 99)}`
      } else {
        return this.bkg
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.bkg = this.genColor()
    }, 100)

    setInterval(() => {
      this.bkg = this.genColor()
    }, this.rate)
  },
}
</script>

<template>
  <div :style="`background-color: ${bkg};`" class="save_btn_deco_element"></div>
</template>

<style scoped>
.save_btn_deco_element {
  position: relative;
  margin-left: 3px;
  width: 5px;
  height: 5px;
  background-color: #4200ff20;
  transition: all ease-in-out 0.3s;
}
@media only screen and (max-width: 700px) and (max-height: 900px) {
  .save_btn_deco_element{
    width: 3vh;
    height: 2.9vh;
  }
}
</style>