
<script setup>
import BaseLabel from '@/components/BaseLabel.vue'
</script>


<script>
export default {
  props: {
    width: { default: '20%' },
    height: { default: '15%' },
    baseColorSet: {
      default: () => {
        return { text: '#770AFF', bkg: '#23005000', border: '#770AFF' }
      },
    },
    HoverColorSet: {
      default: () => {
        return { text: '#9F52FF', bkg: '#23005060', border: '#9F52FF' }
      },
    },
    label: { default: () => {return { text: '--', fontSize: '2vh' }}},
    onClickEventName: { default: '' },
  },
  data() {
    return {
      activeColorSet: { text: '#770AFF', bkg: '#23005000', border: '#770AFF' },
    }
  },
  expose: ['onmouseleave', 'onmouseenter'],
  methods: {
    onmouseenter(activeColorSet, HoverColorSet) {
      this.activeColorSet = this.HoverColorSet
      this.$emit('onMouseEnter')
    },
    onmouseleave() {
      this['activeColorSet'] = this['baseColorSet']
      this.$emit('onMouseLeave')
    },
    onClick(e) {
      this.$emit(this.onClickEventName, e)
    },
  },
  mounted(){
    this.onmouseleave();
  },
}
</script>


<template>
  <div
    :style="`border: solid 1px ${activeColorSet.border}; width: ${width}; height: ${height}; background-color: ${activeColorSet.bkg};`"
    @mouseenter="onmouseenter('activeColorSet', 'HoverColorSet')"
    @mouseleave="onmouseleave"
    @click="onClick"
    class="btn_container"
  >
    <BaseLabel
      :style="`color: ${activeColorSet.text}; font-size: ${label.fontSize}`"
      class="label"
      v-text="label.text"
    ></BaseLabel>
  </div>
</template>

<style scoped>
.btn_container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>