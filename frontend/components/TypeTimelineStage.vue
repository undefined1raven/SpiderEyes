
<script setup>
import VerticalLine from '@/components/VerticalLine.vue'
import HorizontalLine from '@/components/HorizontalLine.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BaseButton from '@/components/BaseButton.vue'
import ArrowButton from '@/components/ArrowButton.vue'

import isMobile from '@/composables/isMobile.ts'
import percentage from '@/composables/percentage.ts'
import rangeScaler from '@/composables/rangeScaler.ts'
</script>

<script>
export default {
  props: {
    readOnly: { default: false },
    isIndexUpButtonEnabled: true,
    isIndexDownButtonEnabled: true,
    stageArrayLength: { default: 0 },
    type: { default: 'natural' },
    duration: { default: 100 },
    index: { default: 0 },
    dreamTypesColorSet: () => {
      return {
        naturalColor: '#8F34FF',
        hybridColor: '#8D7AFF',
        activeColor: '#0500FF',
      }
    },
  },
  data() {
    return {
      selectedDreamTypeID: this.type,
      typeHash: {
        active: 'activeColor',
        hybrid: 'hybridColor',
        natural: 'naturalColor',
      },
    }
  },
  expose: ['updateTypeButtonsStyle'],
  methods: {
    removeStageButtonOnClick() {
      this.$emit('OnRemoveStage', { index: this.index })
    },
    indexButtonStyleController(isEnabled) {
      if (!isEnabled) {
        return {
          baseColor: '#666',
          bkg: 'background-color: #0500FF00; border-right: solid 1px #4700A3',
        }
      } else {
        return {
          baseColor: '#4700A3',
          bkg: 'background-color: ;',
        } /*leaved undefined so css hover would be applied normally */
      }
    },
    emitStateUpdate() {
      this.$emit('stageOnChange', {
        type: this.selectedDreamTypeID,
        duration: this.duration,
        index: this.index,
      })
    },
    emitIndexUpdate(newIndex, oldIndex) {
      this.$emit('stageOnIndexChange', {
        newIndex: newIndex,
        oldIndex: oldIndex,
      })
    },
    stageDownOnClick() {
      if (!this.readOnly) {
        if (this.index + 1 < this.stageArrayLength) {
          this.emitIndexUpdate(this.index + 1, this.index)
        }
        this.checkStageDownButtonState()
      }
    },
    stageUpOnClick() {
      if (!this.readOnly) {
        if (this.index - 1 >= 0) {
          this.emitIndexUpdate(this.index - 1, this.index)
        }
        this.checkStageUpButtonState()
      }
    },
    stageDurationOnInput(e) {
      let input = e.target.value
      if (input.toString().length > 4) {
        e.target.value = input.toString().slice(0, 4)
      } else {
        if (input > 100) {
          e.target.value = 100
        }
        if (input < 0) {
          e.target.value = 0
        }
      }
      this.duration = input
      this.emitStateUpdate()
    },
    dreamTypeButtonsDynamicsStyleController(typeID) {
      /*overrides style for reactivity after the click event*/
      let baseColor = this.dreamTypesColorSet[this.typeHash[typeID]]
      if (typeID == this.selectedDreamTypeID) {
        return `background-color: ${baseColor}40; color: ${baseColor};`
      } else {
        return `background-color: ${baseColor}00; color: #888;`
      }
    },
    dreamTypeOnClick(e, typeID) {
      if (!this.readOnly) {
        this.selectedDreamTypeID = typeID

        let refKeysArr = [
          'naturalDreamTypeButtonRef',
          'hybridDreamTypeButtonRef',
          'activeDreamTypeButtonRef',
        ]

        setTimeout(() => {
          let currentRefKey = `${typeID}DreamTypeButtonRef`

          let ix = refKeysArr.indexOf(currentRefKey)
          if (ix != -1) {
            refKeysArr.splice(ix, 1)
          }
          for (let ix = 0; ix < refKeysArr.length; ix++) {
            this.$refs[refKeysArr[ix]].onmouseleave()
          }
        }, 25)

        this.emitStateUpdate()
      }
    },
    typeButtonsStyleController(typeID) {
      if (typeID == this.selectedDreamTypeID) {
        return {
          baseColorSet: {
            text: '#FFF',
            bkg: `${this.dreamTypesColorSet[this.typeHash[typeID]]}40`,
            border: `${this.dreamTypesColorSet[this.typeHash[typeID]]}`,
          },
          HoverColorSet: {
            text: `${this.dreamTypesColorSet[this.typeHash[typeID]]}`,
            bkg: `${this.dreamTypesColorSet[this.typeHash[typeID]]}40`,
            border: `${this.dreamTypesColorSet[this.typeHash[typeID]]}`,
          },
        }
      } else {
        return {
          baseColorSet: {
            text: '#888',
            bkg: `${this.dreamTypesColorSet[this.typeHash[typeID]]}00`,
            border: `${this.dreamTypesColorSet[this.typeHash[typeID]]}`,
          },
          HoverColorSet: {
            text: `${this.dreamTypesColorSet[this.typeHash[typeID]]}`,
            bkg: `${this.dreamTypesColorSet[this.typeHash[typeID]]}00`,
            border: `${this.dreamTypesColorSet[this.typeHash[typeID]]}`,
          },
        }
      }
    },
    checkStageDownButtonState() {
      if (this.index + 1 < this.stageArrayLength) {
        this.isIndexDownButtonEnabled = true
      } else {
        this.isIndexDownButtonEnabled = false
      }
    },
    checkStageUpButtonState() {
      if (this.index - 1 >= 0) {
        this.isIndexUpButtonEnabled = true
      } else {
        this.isIndexUpButtonEnabled = false
      }
    },
    updateTypeButtonsStyle() {
      this.$refs.naturalDreamTypeButtonRef.onmouseleave()
      this.$refs.hybridDreamTypeButtonRef.onmouseleave()
      this.$refs.activeDreamTypeButtonRef.onmouseleave()
    },
  },
  mounted() {
    setTimeout(() => {
      this.updateTypeButtonsStyle()
      this.checkStageDownButtonState()
      this.checkStageUpButtonState()
    }, 25)
  },
}
</script>

<template>
  <div class="type_timeline_stage_container">
    <BaseButton
      ref="naturalDreamTypeButtonRef"
      class="naturalDreamTypeButton"
      width="3.240vh"
      height="3.240vh"
      onClickEventName="dreamTypeOnClick"
      @dreamTypeOnClick="dreamTypeOnClick($event, 'natural')"
      :label="{ text: 'N', fontSize: '1.9vh' }"
      :baseColorSet="typeButtonsStyleController('natural').baseColorSet"
      :HoverColorSet="typeButtonsStyleController('natural').HoverColorSet"
      :style="dreamTypeButtonsDynamicsStyleController('natural')"
    ></BaseButton>
    <BaseButton
      ref="hybridDreamTypeButtonRef"
      class="hybridDreamTypeButton"
      width="3.240vh"
      height="3.240vh"
      onClickEventName="dreamTypeOnClick"
      @dreamTypeOnClick="dreamTypeOnClick($event, 'hybrid')"
      :label="{ text: 'H', fontSize: '1.9vh' }"
      :baseColorSet="typeButtonsStyleController('hybrid').baseColorSet"
      :HoverColorSet="typeButtonsStyleController('hybrid').HoverColorSet"
      :style="dreamTypeButtonsDynamicsStyleController('hybrid')"
    ></BaseButton>
    <BaseButton
      ref="activeDreamTypeButtonRef"
      class="activeDreamTypeButton"
      width="3.240vh"
      height="3.240vh"
      onClickEventName="dreamTypeOnClick"
      @dreamTypeOnClick="dreamTypeOnClick($event, 'active')"
      :label="{ text: 'A', fontSize: '1.9vh' }"
      :baseColorSet="typeButtonsStyleController('active').baseColorSet"
      :HoverColorSet="typeButtonsStyleController('active').HoverColorSet"
      :style="dreamTypeButtonsDynamicsStyleController('active')"
    ></BaseButton>
    <VerticalLine class="type_timeline_ln_0" color="#4700a3"></VerticalLine>
    <HorizontalLine class="type_timeline_ln_1" color="#4700a3"></HorizontalLine>
    <input :readonly="readOnly" class="stage_duration_input" @input="stageDurationOnInput" type="number" :value="duration" min="0" max="100" step="5"></input>
    <div class="remove_stage_btn" @click="removeStageButtonOnClick">
      <VerticalLine class="remove_stage_btn_indi_0" color="#4700a3"></VerticalLine>
      <VerticalLine class="remove_stage_btn_indi_1" color="#4700a3"></VerticalLine>
    </div>
    <ArrowButton class="stage_index_decrease_btn" :style="indexButtonStyleController(isIndexUpButtonEnabled).bkg" :color="indexButtonStyleController(isIndexDownButtonEnabled).baseColor" onClickEventName="stageDownOnClick" @stageDownOnClick="stageDownOnClick"></ArrowButton>
    <ArrowButton class="stage_index_increase_btn" :style="indexButtonStyleController(isIndexDownButtonEnabled).bkg" :color="indexButtonStyleController(isIndexUpButtonEnabled).baseColor" onClickEventName="stageUpOnClick" @stageUpOnClick="stageUpOnClick"></ArrowButton>
  </div>
</template>

<style scoped>
.stage_index_increase_btn {
  top: 51.111111111%;
  left: 90.454545455%;
  transform: rotate(180deg);
  border: none !important;
}
.stage_index_decrease_btn {
  top: 51.111111111%;
  left: 80.909090909%;
}
.remove_stage_btn_indi_0 {
  height: 70%;
  transform: rotate(45deg);
}
.remove_stage_btn_indi_1 {
  height: 70%;
  transform: rotate(-45deg);
}
.stage_duration_input,
.remove_stage_btn {
  position: absolute;
  top: 0.022222222%;
  left: 65.93636364%;
  width: 31.681818182%;
  height: 48.666666667%;
  background-color: #4700a300;
  border: none;
  outline: none;
  color: #fff;
  font-family: 'Electrolize', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.remove_stage_btn {
  top: 51.111111111%;
  width: 14.090909091%;
  border-right: solid 1px #4700a3;
}
.stage_duration_input:hover,
.remove_stage_btn:hover {
  background-color: #4700a340;
}
.stage_duration_input::selection,
.stage_index_input::selection {
  background-color: #88888840;
}
.type_timeline_ln_0 {
  top: 0%;
  left: 65.909090909%;
  height: 100%;
}
.type_timeline_ln_1 {
  left: 65.909090909%;
  width: 34.090909091%;
}
.hybridDreamTypeButton {
  left: 25.454545455%;
}
.naturalDreamTypeButton {
  left: 2.727272727%;
}
.activeDreamTypeButton {
  left: 48.181818182%;
}
.type_timeline_stage_container {
  position: relative;
  width: 99%;
  height: 315%;
  border: solid 1px #4700a3;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5%;
}
</style>