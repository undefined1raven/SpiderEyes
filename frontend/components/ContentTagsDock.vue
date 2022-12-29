
<script setup>
import VerticalLine from '@/components/VerticalLine.vue'
import HorizontalLine from '@/components/HorizontalLine.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BaseButton from '@/components/BaseButton.vue'
import SenseChart from '@/components/SenseChart.vue'

import isMobile from '@/composables/isMobile.ts'
import percentage from '@/composables/percentage.ts'
import rangeScaler from '@/composables/rangeScaler.ts'
</script>

<script>
export default {
  props: {
    readOnly: { default: false },
    contentTagsIn: {
      type: Array,
      default: () => {
        return [
          { tag: 'Sci-fi', isActive: false },
          { tag: 'Horror', isActive: false },
          { tag: 'Survival', isActive: false },
          { tag: 'Aliens', isActive: false },
          { tag: 'Social', isActive: false },
          { tag: 'Romance', isActive: false },
          { tag: 'War', isActive: false },
          { tag: 'Physics', isActive: false },
          { tag: 'Abstract', isActive: false },
          { tag: 'Spaceflight', isActive: false },
        ]
      },
    },
  },
  data() {
    return {
      isInAddTagMode: false,
      contentTags: [
          { tag: 'Sci-fi', isActive: false },
          { tag: 'Horror', isActive: false },
          { tag: 'Survival', isActive: false },
          { tag: 'Aliens', isActive: false },
          { tag: 'Social', isActive: false },
          { tag: 'Romance', isActive: false },
          { tag: 'War', isActive: false },
          { tag: 'Physics', isActive: false },
          { tag: 'Abstract', isActive: false },
          { tag: 'Spaceflight', isActive: false },
        ],
    }
  },
  mounted() {
    this.updateGlobalDreamObj()
  },
  methods: {
    updateGlobalDreamObj() {
      this.$emit('updateDreamObj', {
        key: 'contentTags',
        value: this.contentTags,
      })
    },
    addTagButtonActualOnClick() {
      let input = this.$refs.newTagInput.value
      if (input.length > 0 && input.length < 31) {
        this.contentTags.push({ tag: input, isActive: true })
        this.isInAddTagMode = false
        this.updateGlobalDreamObj()
      }
    },
    cancelNewTagButtonOnClick() {
      this.isInAddTagMode = false
    },
    enterAddTagModeButtonOnClick() {
      if (!this.readOnly) {
        this.isInAddTagMode = true
        setTimeout(() => {
          this.$refs.newTagInput.focus()
        }, 50)
      }
    },
    contentTagOnClick(index) {
      if (!this.readOnly) {
        this.contentTags[index].isActive = !this.contentTags[index].isActive
        this.updateGlobalDreamObj()
      }
    },
    tagStyleController(index) {
      if(this.readOnly){
        if (this.contentTagsIn[index].isActive) {
          return 'border: solid 1px #4700A3; background-color: #4700A340; color: #FFF;'
        } else {
          return 'border: solid 1px #4700A3; background-color: #4700A300; color: #888;'
        }
      }else{
        if (this.contentTags[index].isActive) {
          return 'border: solid 1px #4700A3; background-color: #4700A340; color: #FFF;'
        } else {
          return 'border: solid 1px #4700A3; background-color: #4700A300; color: #888;'
        }        
      }
    },
    tagSourceController(){
      if(this.readOnly){
        return this.contentTagsIn
      }
      else{
        return this.contentTags
      }
    },
    tagOnMouseEnter(e) {
      if (!this.readOnly) {
        e.target.style.color = '#8F34FF'
        e.target.style.borderColor = '#8F34FF'
      }
    },
    tagOnMouseLeave(e, index) {
      if (!this.readOnly) {
        e.target.style = this.tagStyleController(index)
      }
    },
  },
}
</script>

<template>
  <div class="content_tags_dock_container">
    <BaseLabel
      id="content_tags_l"
      v-text="'Content Tags'"
      color="#8F34FF"
    ></BaseLabel>
    <HorizontalLine
      id="content_tags_dock_ln_0"
      color="#0500FF00"
    ></HorizontalLine>
    <ul id="content_tags_list">
      <div
        class="content_tag"
        v-for="(tag, index) in tagSourceController()"
        :key="index"
        v-text="tag.tag"
        @mouseenter="tagOnMouseEnter"
        @mouseleave="tagOnMouseLeave($event, index)"
        :style="tagStyleController(index)"
        @click="contentTagOnClick(index)"
      ></div>
    </ul>
    <BaseButton
    id="add_tag_btn"
    width="20.872274143%"
    height="7.86163522%"
    :onClickEventName="'enterAddTagModeButtonOnClick'"
    @enterAddTagModeButtonOnClick="enterAddTagModeButtonOnClick"
      :label="{ text: 'Add', fontSize: '2vh' }"
    ></BaseButton>
    <Transition name="fade">
    <div v-if="isInAddTagMode" id="add_tag_container">
        <input ref="newTagInput" type="text" spellcheck="false" id="new_tag_input"></input>
        <BaseButton
        onClickEventName="addTagButtonActualOnClick"
        @addTagButtonActualOnClick="addTagButtonActualOnClick"
        id="add_tag_acx_btn"
        width="33.333333333%"
        height="12.86163522%"
        v-model="newTagInput"
        :label="{ text: 'Add Tag', fontSize: '2vh' }"
        ></BaseButton>
        <BaseButton
        id="cancel_btn"
        onClickEventName="cancelNewTagButtonOnClick"
        @cancelNewTagButtonOnClick="cancelNewTagButtonOnClick"
        width="33.333333333%"
        height="12.86163522%"
        :label="{ text: 'Cancel', fontSize: '2vh' }"
        :baseColorSet="{text: '#4a00a7', bkg: '#2F006C00', border: '#2F006C'}"
        :HoverColorSet="{text: '#7508ff', bkg: '#4700A320', border: '#4700A3'}"
        ></BaseButton>
        <BaseLabel id="add_tag_l" color="#FFF" v-text="'Enter the name of the tag'"></BaseLabel>
    </div>
    </Transition>
  </div>
</template>

<style scoped>
#add_tag_l {
  top: 22.819548872%;
  left: 50%;
  transform: translate(-50%);
  white-space: nowrap;
  font-size: 2vh;
}
#add_tag_acx_btn,
#cancel_btn {
  top: 80.082706767%;
  left: 13.707165109%;
}
#cancel_btn {
  left: 53.271028037%;
}
#new_tag_input {
  position: absolute;
  background-color: #0b001a00;
  border: solid 1px #4700a3;
  width: 72.897196262%;
  height: 10.902255639%;
  top: 37.593984962%;
  left: 50%;
  transform: translate(-50%);
  outline: none;
  color: #8f34ff;
  font-size: 2vh;
  transition: all linear 0.07s;
  transition: color linear 0.12s;
}
#new_tag_input:hover {
  background-color: #4700a340;
}
#new_tag_input:focus {
  color: #bf8aff;
}
#new_tag_input::selection {
  background-color: #88888840;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@keyframes fade_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
#add_tag_container {
  position: absolute;
  top: 16.352201258%;
  left: 0%;
  height: 83.647798742%;
  width: 100%;
  background-color: #0b001aaa;
  backdrop-filter: blur(4px);
  animation: fade_in ease-in-out 0.1s;
}
#add_tag_btn {
  top: 19%;
  left: 73.900934579%;
}
.content_tag {
  position: relative;
  border-radius: 3px;
  border: solid 1px #4700a3;
  width: 94%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: #888888;
  font-family: 'Electrolize', sans-serif;
  font-size: 1.9vh;
  transition: all linear 0.07s;
  transition: color linear 0.12s;
  padding-top: 5%;
  padding-bottom: 5%;
  text-align: center;
}
.content_tag:hover {
  color: #8f34ff;
}
#content_tags_list {
  position: absolute;
  top: 19%;
  left: 4.672897196%;
  width: 66.355140187%;
  height: 80.616352201%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, 1fr);
  overflow-y: scroll;
  row-gap: 5%;
}
#content_tags_dock_ln_0 {
  top: 16.037735849%;
  left: 0%;
  width: 100%;
  background: linear-gradient(90deg, #4900a7 0%, rgba(73, 0, 167, 0.15) 100%);
}
#content_tags_l {
  top: 4.402515723%;
  left: 3.896103896%;
  font-size: 2.3vh;
}
.content_tags_dock_container {
  position: absolute;
  top: 2.037037037%;
  left: 53.385416667%;
  width: 16.71875%;
  height: 29.444444444%;
  background: linear-gradient(
    174.97deg,
    rgba(36, 0, 82, 0.6) 0%,
    rgba(19, 0, 74, 0.6) 99.99%,
    rgba(15, 0, 74, 0.6) 100%
  );
}
</style>