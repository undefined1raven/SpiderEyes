
<script setup>
import VerticalLine from '@/components/VerticalLine.vue'
import HorizontalLine from '@/components/HorizontalLine.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BaseButton from '@/components/BaseButton.vue'
import ColorPicker from '@/components/ColorPicker.vue'
import TypeTimelineStage from '@/components/TypeTimelineStage.vue'

import isMobile from '@/composables/isMobile.ts'
import percentage from '@/composables/percentage.ts'
import rangeScaler from '@/composables/rangeScaler.ts'

import { ref } from 'vue'
</script>


<script>
export default {
  props: {
    colorSet: {
      type: Object,
      default: {
        naturalDreamTypeColor: '#00FF11',
        hybridDreamTypeColor: '#FFFFFF',
        activeDreamTypeColor: '#FF0000',
      },
    },
    readOnly: { default: false },
    typeTimelineStagesIn: {
      type: Array,
      default: () => {
        return [
          { type: 'natural', duration: 50 },
          { type: 'active', duration: 20 },
          { type: 'hybrid', duration: 30 },
        ]
      },
    },
  },
  data() {
    return {
      updateTrigger: true,
      isAwarnenessHigh: true,
      naturalDreamTypeColor: '#FFF',
      hybridDreamTypeColor: '#FFF',
      activeDreamTypeColor: '#FFF',
      typeTimelineStages: [
        { type: 'natural', duration: 50 },
        { type: 'active', duration: 20 },
        { type: 'hybrid', duration: 30 },
      ],
    }
  },
  mounted() {
    this.naturalDreamTypeColor = this.$refs.natColor.Color()
    this.hybridDreamTypeColor = this.$refs.hybridColor.Color()
    this.activeDreamTypeColor = this.$refs.activeColor.Color()
    this.updateGlobalDreamObject()
  },
  methods: {
    typeTimelineStagesSourceController() {
      if (this.readOnly) {
        return this.typeTimelineStagesIn
      } else {
        return this.typeTimelineStages
      }
    },
    updateGlobalDreamObject() {
      this.$emit('updateDreamObj', {
        key: 'typeTimeline',
        value: {
          typeTimelineStages: this.typeTimelineStages,
          colorSet: {
            naturalDreamTypeColor: this.naturalDreamTypeColor,
            hybridDreamTypeColor: this.hybridDreamTypeColor,
            activeDreamTypeColor: this.activeDreamTypeColor,
          },
          isAwarnenessHigh: this.isAwarnenessHigh,
        },
      })
    },
    OnRemoveStage(args) {
      if (!this.readOnly) {
        let ix = args.index
        if (ix > 0) {
          this.typeTimelineStages[ix - 1].duration +=
            this.typeTimelineStages[ix].duration
        } else {
          this.typeTimelineStages[ix + 1].duration +=
            this.typeTimelineStages[ix].duration
        }
        this.typeTimelineStages.splice(ix, 1)
        this.updateGlobalDreamObject()
      }
    },
    addStageButtonOnClick() {
      if (!this.readOnly) {
        let prevDuration =
          this.typeTimelineStages[this.typeTimelineStages.length - 1].duration
        this.typeTimelineStages[this.typeTimelineStages.length - 1].duration =
          prevDuration / 2
        this.typeTimelineStages.push({
          type: 'natural',
          duration: prevDuration / 2,
        })
        this.updateGlobalDreamObject()
      }
    },
    stageOnIndexChange(args) {
      if (!this.readOnly) {
        let newIndex = args.newIndex
        let oldIndex = args.oldIndex
        let stateSave = this.typeTimelineStages[newIndex]

        this.typeTimelineStages[newIndex] = this.typeTimelineStages[oldIndex]
        this.typeTimelineStages[oldIndex] = stateSave

        this.redrawStageList()

        this.updateTrigger = false
        setTimeout(() => {
          this.updateTrigger = true
        }, 10)
        this.updateGlobalDreamObject()
      }
    },
    stageOnChange(args) {
      if (!this.readOnly) {
        let index = args.index
        let type = args.type
        let duration = args.duration
        this.typeTimelineStages[index] = { type: type, duration: duration }

        this.redrawStageList()
        for (let ix = 0; ix < this.typeTimelineStages.length; ix++) {
          this.$refs.dreamStage_[ix].updateTypeButtonsStyle()
        }
        this.updateGlobalDreamObject()
      }
    },
    redrawStageList() {
      let state = this.isAwarnenessHigh
      this.isAwarnenessHigh = !this.isAwarnenessHigh
      this.isAwarnenessHigh = state /**ive no idea why this works */
    },
    dreamTypeColorFetcher(typeID) {
      if(!this.readOnly){
        let refHash = {
          active: 'activeDreamTypeColor',
          hybrid: 'hybridDreamTypeColor',
          natural: 'naturalDreamTypeColor',
        }
        return this[refHash[typeID]]
      }else{
        let refHash = {
          active: 'activeDreamTypeColor',
          hybrid: 'hybridDreamTypeColor',
          natural: 'naturalDreamTypeColor',
        }
        return this['colorSet'][refHash[typeID]]
      }
    },
    parseTypeSegmentLength(index, SegmentsArrayLength, SegmentLength) {
      if (index + 1 == SegmentsArrayLength) {
        return SegmentLength
      } else {
        return SegmentLength - 2 //offset 2% right margin
      }
    },
    onColorUpdate(args, key) {
      if (!this.readOnly) {
        this[key] = args.color
        for (let ix = 0; ix < this.typeTimelineStages.length; ix++) {
          this.$refs.dreamStage_[ix].updateTypeButtonsStyle()
        }
        this.redrawStageList()
        this.updateGlobalDreamObject()
      }
    },
    dreamTypeStyleController(baseColor) {
      return `color: #FFF; background-color: ${baseColor}40; border: solid 1px ${baseColor}`
    },
    awarenessLowButtonOnClick() {
      if (!this.readOnly) {
        this.isAwarnenessHigh = false
        setTimeout(() => {
          this.$refs.awareness_high_btn_ref.onmouseleave()
          this.$refs.awareness_low_btn_ref.onmouseenter()
        }, 50)
        this.updateGlobalDreamObject()
      }
    },
    awarenessHighButtonOnClick() {
      if (!this.readOnly) {
        this.isAwarnenessHigh = true
        setTimeout(() => {
          this.$refs.awareness_low_btn_ref.onmouseleave()
          this.$refs.awareness_high_btn_ref.onmouseenter()
        }, 50)
        this.updateGlobalDreamObject()
      }
    },
    awarenessButtonsStyleController(boolean) {
      if (boolean) {
        return {
          baseColorSet: { text: '#FFF', bkg: '#4700A340', border: '#4700A3' },
          HoverColorSet: {
            text: '#FFF',
            bkg: '#4700A340',
            border: '#8F34FF',
          },
        }
      } else {
        return {
          baseColorSet: { text: '#888', bkg: '#4700A300', border: '#4700A3' },
          HoverColorSet: {
            text: '#888',
            bkg: '#4700A300',
            border: '#8F34FF',
          },
        }
      }
    },
    DreamTypeController() {
      if (this.readOnly) {
        return {
          naturalDreamTypeColor: this.colorSet['naturalDreamTypeColor'],
          activeDreamTypeColor: this.colorSet['activeDreamTypeColor'],
          hybridDreamTypeColor: this.colorSet['hybridDreamTypeColor'],
        }
      } else {
        return {
          naturalDreamTypeColor: this.naturalDreamTypeColor,
          activeDreamTypeColor: this.activeDreamTypeColor,
          hybridDreamTypeColor: this.hybridDreamTypeColor,
        }
      }
    },
  },
}
</script>

<template>
  <div class="type_timeline_dock_container">
    <BaseLabel
      id="type_timeline_l"
      v-text="'Dream Timeline'"
      color="#8F34FF"
    ></BaseLabel>
    <HorizontalLine id="type_timeline_ln_0" color="#8F34FF00"></HorizontalLine>
    <BaseLabel
      id="type_timeline_awareness_l"
      v-text="'Awareness Level'"
      color="#8F34FF"
    ></BaseLabel>
    <BaseButton
      id="awareness_low_btn"
      width="18.893129771%"
      class="awareness_x_btn"
      height="10.86163522%"
      ref="awareness_low_btn_ref"
      onClickEventName="awarenessLowButtonOnClick"
      @awarenessLowButtonOnClick="awarenessLowButtonOnClick"
      :baseColorSet="
        awarenessButtonsStyleController(!isAwarnenessHigh).baseColorSet
      "
      :HoverColorSet="
        awarenessButtonsStyleController(!isAwarnenessHigh).HoverColorSet
      "
      :label="{ text: 'Low' }"
    ></BaseButton>
    <BaseButton
      id="awareness_high_btn"
      class="awareness_x_btn"
      width="18.893129771%"
      height="10.86163522%"
      onClickEventName="awarenessHighButtonOnClick"
      @awarenessHighButtonOnClick="awarenessHighButtonOnClick"
      ref="awareness_high_btn_ref"
      :baseColorSet="
        awarenessButtonsStyleController(isAwarnenessHigh).baseColorSet
      "
      :HoverColorSet="
        awarenessButtonsStyleController(isAwarnenessHigh).HoverColorSet
      "
      :label="{ text: 'High' }"
    ></BaseButton>
    <HorizontalLine id="type_timeline_ln_1" color="#0500ff00"></HorizontalLine>
    <BaseLabel
      id="type_timeline_dream_types_l"
      v-text="'Dream Type'"
      color="#8F34FF"
    ></BaseLabel>
    <ColorPicker
      :ref="'natColor'"
      @colorUpdate="onColorUpdate($event, 'naturalDreamTypeColor')"
      id="natural_dream_type_color_picker"
      class="color_picker"
      :readOnly="readOnly"
      defaultColor="#8F34FF"
    ></ColorPicker>
    <BaseLabel
      id="natural_dream_type_l"
      class="dream_type"
      v-text="'Natural'"
      :style="dreamTypeStyleController(this.naturalDreamTypeColor)"
    ></BaseLabel>

    <ColorPicker
      :ref="'hybridColor'"
      @colorUpdate="onColorUpdate($event, 'hybridDreamTypeColor')"
      id="hybrid_dream_type_color_picker"
      defaultColor="#8D7AFF"
      class="color_picker"
      :readOnly="readOnly"
    ></ColorPicker>
    <BaseLabel
      id="hybrid_dream_type_l"
      class="dream_type"
      v-text="'Hybrid'"
      :style="dreamTypeStyleController(this.hybridDreamTypeColor)"
    ></BaseLabel>

    <ColorPicker
      :ref="'activeColor'"
      @colorUpdate="onColorUpdate($event, 'activeDreamTypeColor')"
      id="active_dream_type_color_picker"
      defaultColor="#0500FF"
      :readOnly="readOnly"
      class="color_picker"
    ></ColorPicker>
    <BaseLabel
      id="active_dream_type_l"
      class="dream_type"
      v-text="'Active'"
      :style="dreamTypeStyleController(this.activeDreamTypeColor)"
    ></BaseLabel>
    <VerticalLine id="type_timeline_ln_2" color="#0500ff00"></VerticalLine>
    <ul id="type_timeline_list" v-if="updateTrigger">
      <TypeTimelineStage
        @stageOnChange="stageOnChange"
        @stageOnIndexChange="stageOnIndexChange"
        :dreamTypesColorSet="{
          naturalColor: DreamTypeController().naturalDreamTypeColor,
          hybridColor: DreamTypeController().hybridDreamTypeColor,
          activeColor: DreamTypeController().activeDreamTypeColor,
        }"
        v-for="(stage, index) in typeTimelineStagesSourceController()"
        :readOnly="readOnly"
        :key="index"
        :type="stage.type"
        :duration="stage.duration"
        :index="index"
        @OnRemoveStage="OnRemoveStage"
        :stageArrayLength="typeTimelineStages.length"
        ref="dreamStage_"
      ></TypeTimelineStage>
    </ul>
    <ul ref="dreamTypeTimelineRef" class="dream_type_timeline_list">
      <HorizontalLine
        class="type_segment"
        v-for="(typeSegment, ix) in typeTimelineStagesSourceController()"
        :key="ix"
        :stageArrayLength="typeTimelineStagesSourceController().length"
        :style="`width: ${parseTypeSegmentLength(
          ix,
          typeTimelineStagesSourceController().length,
          typeSegment.duration
        )}%; background-color: ${dreamTypeColorFetcher(typeSegment.type)}`"
      ></HorizontalLine>
    </ul>

    <HorizontalLine id="type_timeline_ln_3" color="#0500FF00"></HorizontalLine>

    <BaseButton
      id="add_stage_btn"
      class="awareness_x_btn"
      height="8.805031447%"
      width="26.717557252%"
      onClickEventName="addStageButtonOnClick"
      @addStageButtonOnClick="addStageButtonOnClick"
      :label="{ text: 'Add Stage', fontSize: '1.9vh' }"
    ></BaseButton>
  </div>
</template>

<style scoped>
#add_stage_btn {
  top: 88.679245283%;
  left: 61.259541985%;
}
#type_timeline_ln_3 {
  top: 85.220125786%;
  left: 54.198473282%;
  width: 41.984732824%;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #4900a7 0%,
    rgba(73, 0, 167, 0.15) 100%
  );
}
.type_segment {
  position: relative;
  height: 100%;
  margin-right: 2%;
}
.dream_type_timeline_list {
  top: 57.046540881%;
  left: 28.477099237%;
  transform: rotate(90deg);
  width: 42.909924%;
  height: 3.459119497%;
  border-right: solid 1px #4900a7;
  border-left: solid 1px #4900a7;
}
#type_timeline_list {
  position: absolute;
  top: 18.867924528%;
  left: 54.198473282%;
  width: 41.984732824%;
  height: 65.72327044%;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  overflow-y: scroll;
  row-gap: 20%;
  padding-right: 2%;
}
#type_timeline_ln_2 {
  top: 18.867924528%;
  left: 46.946564885%;
  height: 78.616352201%;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #4900a7 0%,
    rgba(73, 0, 167, 0.15) 100%
  );
}
#active_dream_type_color_picker {
  top: 89.308176101%;
}
#active_dream_type_l {
  top: 86.79245283%;
}
#natural_dream_type_l {
  top: 61.635220126%;
}
#hybrid_dream_type_l {
  top: 74.528301887%;
}
#hybrid_dream_type_color_picker {
  top: 77.358490566%;
}
.dream_type {
  width: 18.893129771%;
  height: 7.86163522%;
  font-size: 2vh;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 10.496183206%;
}
#type_timeline_dream_types_l {
  top: 50.314465409%;
  left: 13.549618321%;
  font-size: 2vh;
}
#type_timeline_ln_1 {
  top: 45.710692%;
  left: 1.908396947%;
  width: 43.129770992%;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #4900a7 0%,
    rgba(73, 0, 167, 0.15) 100%
  );
}
#natural_dream_type_color_picker {
  top: 64.150943396%;
}
.color_picker {
  left: 29.689312977%;
}
.awareness_x_btn {
  transition: all linear 0.1s;
}
#awareness_low_btn,
#awareness_high_btn {
  top: 29.559748428%;
  left: 4.198473282%;
}
#awareness_high_btn {
  left: 24.045801527%;
}
#type_timeline_awareness_l {
  top: 18.867924528%;
  left: 10.114503817%;
  font-size: 2vh;
}
#type_timeline_ln_0 {
  top: 16.037735849%;
  left: 0%;
  width: 100%;
  background: linear-gradient(90deg, #4900a7 0%, rgba(73, 0, 167, 0.15) 100%);
}
#type_timeline_l {
  top: 5.031446541%;
  left: 4.198473282%;
  font-size: 2.3vh;
}
.type_timeline_dock_container {
  position: absolute;
  top: 2.037037037%;
  left: 71.40625%;
  width: 27.291666667%;
  height: 29.444444444%;
  background: linear-gradient(
    174.97deg,
    rgba(36, 0, 82, 0.6) 0%,
    rgba(19, 0, 74, 0.6) 99.99%,
    rgba(15, 0, 74, 0.6) 100%
  );
}
</style>