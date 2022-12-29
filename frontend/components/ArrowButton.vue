

<script>
export default {
  props: {
    width: { default: '9.090909091%' },
    height: { default: '46.666666667%' },
    color: { default: '#4700A3' },
    onClickEventName: { default: '' },
  },
  methods: {
    arrowIndicatorOnMouseEnter(e) {
      e.target.style.backgroundColor = `${this.color}40`
    },
    arrowIndicatorOnMouseLeave(e) {
      e.target.style.backgroundColor = '#0500ff00'
    },
    arrowIndicatorOnClick(e) {
      this.$emit(this.onClickEventName, e)
    },
  },
}
</script>

<template>
  <div
    @mouseenter="arrowIndicatorOnMouseEnter"
    @mouseleave="arrowIndicatorOnMouseLeave"
    @click="arrowIndicatorOnClick"
    class="arrow_indicator_container"
    :style="`width: ${width}; height: ${height}; border-right: solid 1px ${color}`"
  >
    <svg
      class="arrow_actual"
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" width="1" height="10" :fill="color" />
      <rect
        x="0.100006"
        y="7.70703"
        width="1"
        height="4.40371"
        transform="rotate(-45 0.100006 7.70703)"
        :fill="color"
      />
      <rect
        x="6.2139"
        y="7"
        width="1"
        height="4.82588"
        transform="rotate(45 6.2139 7)"
        :fill="color"
      />
    </svg>
  </div>
</template>

<style scoped>
.arrow_actual {
  width: 100%;
  height: 100%;
}
.arrow_indicator_container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>