
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
    isDropdownMenuEnabled: { default: false },
    activeWID: {default: 'properties'},
  },
  data() {
    return {
      labelToDreamWIDTypeMap: {'Description': 'description', 'Dream Type': 'dreamType', 'Content Tags': 'contentTags', 'Properties': 'properties', 'Refs': 'refs'},
      DreamWIDtoLabelMap: {'description': 'Description', 'dreamType': 'Dream Type', 'contentTags': 'Content Tags', 'properties': 'Properties', 'refs': 'Refs'},
    }
  },
  methods: {
    menuButtonOnClick(e){
      this.$emit('newDreamWID', this.labelToDreamWIDTypeMap[e.target.innerText])
      e.target.innerText = this.DreamWIDtoLabelMap[this.activeWID];
    },
  },
}
</script>

<template>
  <Transition name="ani">
    <div v-show="isDropdownMenuEnabled" class="nav_dropdown_container">
      <VerticalLine color="#770AFF" class="dropdown_ln_0"></VerticalLine>
      <BaseLabel @menuButtonOnClick="menuButtonOnClick" clickEventName="menuButtonOnClick" color="#770AFF" class="menu_button" v-text="'Description'"></BaseLabel>
      <BaseLabel @menuButtonOnClick="menuButtonOnClick" clickEventName="menuButtonOnClick" color="#770AFF" class="menu_button dt" v-text="'Dream Type'"></BaseLabel>
      <BaseLabel @menuButtonOnClick="menuButtonOnClick" clickEventName="menuButtonOnClick" color="#770AFF" class="menu_button refs" v-text="'Refs'"></BaseLabel>
      <BaseLabel @menuButtonOnClick="menuButtonOnClick" clickEventName="menuButtonOnClick" color="#770AFF" class="menu_button ct" v-text="'Content Tags'"></BaseLabel>
    </div>
  </Transition>
</template>

<style scoped>
@keyframes in{
  0%{transform: translateX(-60px); opacity: 0;}
  100%{transform: translateX(0px); opacity: 1;}
}
.dropdown_ln_0 {
  left: 0%; /**3.90625 */
  height: 100%;
}
.ani-enter-active {
  transition: all 0.08s cubic-bezier(1, 0.5, 0.8, 1);
}

.ani-leave-active {
  transition: all 0.08s cubic-bezier(1, 0.5, 0.8, 1);
}
.ani-enter-from{
  transform: translateX(-60px);
}
.ani-enter-to{
  transform: translateX(0px);
}
.ani-leave-to {
  transform: translateX(-60px);
  opacity: 0;
}
.nav_dropdown_container {
  position: absolute;
  top: 7.34375%;
  left: 0%;
  width: 35.555555556%;
  height: 22.1875%;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(2px);
  border-right: solid 1px #770aff;
  border-bottom: solid 1px #770aff;
  border-bottom-right-radius: 5px;
  animation: in 0.08s linear;
}
.menu_button:hover{
  background-color: #770aff40;
}
.menu_button{
  width: 100%;
  height: 24.647887324%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: solid 1px #770aff;
  background-color: #770aff20;
  font-size: 2.2vh;
}
.dt{
  top: calc(22.535211268% + 2.816901408%);
}
.refs{
  top: calc(45.070422535% + 5.816901408%);
}
.ct{
  top: calc(67.605633803% + 7.76901408%);;
  border: none;
}
</style>
