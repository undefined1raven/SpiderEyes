
<script setup>
import VerticalLine from '@/components/VerticalLine.vue'
import HorizontalLine from '@/components/HorizontalLine.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import SenseChart from '@/components/SenseChart.vue'

import isMobile from '@/composables/isMobile.ts'
import percentage from '@/composables/percentage.ts'
import rangeScaler from '@/composables/rangeScaler.ts'
</script>


<script>
export default {
  methods: {
    updateGlobalDreamObj() {
      this.$emit('updateDreamObj', {
        key: 'properties',
        value: this.properties,
      })
    },
    propValueEditorMouseEnter(e, hoverBkgColor) {
      e.target.style.backgroundColor = hoverBkgColor
    },
    propValueEditorMouseLeave(e) {
      e.target.style.backgroundColor = '#0500FF00'
    },
    sleepDurationOnInput(e) {
      let input = e.target.value
      if (input.toString().length > 4) {
        e.target.value = input.toString().slice(0, 4)
      } else {
        if (input < 0) {
          e.target.value = 0
        }
      }
      this.updateGlobalDreamObj()
    },
    propertiesRangeOnInput(e, propColorSetRef, isInverted) {
      let input = e.target.value
      if (input.toString().length > 3) {
        e.target.value = input.toString().slice(0, 4)
      } else {
        if (input > 1) {
          e.target.value = 1
        }
        if (input < 0) {
          e.target.value = 0
        }
      }
      let baseColor = ''
      if (!isInverted) {
        baseColor = `${rangeScaler(input, 0, 1, 255, 0)}, ${rangeScaler(
          input,
          0,
          1,
          0,
          255
        )}, 150`
      } else {
        baseColor = `${rangeScaler(input, 1, 0, 255, 0)}, ${rangeScaler(
          input,
          1,
          0,
          0,
          255
        )}, 150`
      }
      this[propColorSetRef].baseColor = `rgb(${baseColor})`
      this[propColorSetRef].hoverBkgColor = `rgba(${baseColor}, 0.2)`
      this.updateGlobalDreamObj()
    },
    SenseChartUpdate(args) {
      this.properties.senses[args.chartID] = {
        maxIntensityValue: args.maxIntensityValue,
        timelinePoints: args.timelinePoints,
      }
      this.updateGlobalDreamObj()
    },
    propertiesSourceController() {
      if (this.readOnly) {
        return this.propertiesIn
      } else {
        return this.properties
      }
    },
    globalChartsRedraw() {
      let refArray = [
        'touchChartRef',
        'sightChartRef',
        'hearingChartRef',
        'smellChartRef',
        'accChartRef',
        'loveChartRef',
        'fearChartRef',
        'happinessChartRef',
        'sadnessChartRef',
        'angerChartRef',
      ]
      refArray.forEach((e) => {
        this.$refs[e].redraw()
      })
    },
  },
  expose: ['globalChartsRedraw'],
  props: {
    readOnly: { default: false },
    propertiesIn: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      properties: {
        senses: {
          sight: { maxIntensityValue: -1, timelinePoints: [] },
          touch: { maxIntensityValue: -1, timelinePoints: [] },
          hearing: { maxIntensityValue: -1, timelinePoints: [] },
          smell: { maxIntensityValue: -1, timelinePoints: [] },
          acc: { maxIntensityValue: -1, timelinePoints: [] },
          love: { maxIntensityValue: -1, timelinePoints: [] },
          fear: { maxIntensityValue: -1, timelinePoints: [] },
          happiness: { maxIntensityValue: -1, timelinePoints: [] },
          sadness: { maxIntensityValue: -1, timelinePoints: [] },
          anger: { maxIntensityValue: -1, timelinePoints: [] },
        },
        scores: {
          realism: 1,
          continuity: 1,
          activeInterpretation: 1,
          timeRelativityIndex: 1,
          jetLagEffect: 0,
          duration: 0,
          start: '',
        },
      },
      realismPropColorSet: {
        baseColor: '#00EA96',
        hoverBkgColor: '#00EA9620',
      },
      continuityPropColorSet: {
        baseColor: '#00EA96',
        hoverBkgColor: '#00EA9620',
      },
      interpretationPropColorSet: {
        baseColor: '#00EA96',
        hoverBkgColor: '#00EA9620',
      },
      TRIPropColorSet: {
        baseColor: '#00EA96',
        hoverBkgColor: '#00EA9620',
      },
      JLEPropColorSet: {
        baseColor: '#00EA96',
        hoverBkgColor: '#00EA9620',
      },
    }
  },
  mounted() {
    this.updateGlobalDreamObj()
  },
}
</script>

<template>
  <div class="properties_dock_container">
    <BaseLabel
      id="properties_l"
      v-text="'Properties'"
      color="#8F34FF"
      v-show="!isMobile()"
    ></BaseLabel>
    <HorizontalLine 
    v-show="!isMobile()"
    id="prop_ln_0" 
    color="#0500FF00">
  </HorizontalLine>
    <SenseChart ref="touchChartRef" :readOnly="readOnly" :input="propertiesSourceController().senses.touch" @touchChartUpdate="SenseChartUpdate" updateEventName="touchChartUpdate" chartID="touch" class="x_chart" id="touch_chart" label="Touch"></SenseChart>
    <SenseChart ref="sightChartRef" :readOnly="readOnly" :input="propertiesSourceController().senses.sight" @sightChartUpdate="SenseChartUpdate" updateEventName="sightChartUpdate" chartID="sight" class="x_chart" id="sight_chart" label="Sight"></SenseChart>
    <SenseChart ref="hearingChartRef" :readOnly="readOnly" :input="propertiesSourceController().senses.hearing" @hearingChartUpdate="SenseChartUpdate" updateEventName="hearingChartUpdate" chartID="hearing" class="x_chart" id="hearing_chart" label="Hearing"></SenseChart>
    <SenseChart ref="smellChartRef" :readOnly="readOnly" :input="propertiesSourceController().senses.smell" @smellChartUpdate="SenseChartUpdate" updateEventName="smellChartUpdate" chartID="smell" class="x_chart" id="smell_chart" label="Smell"></SenseChart>
    <SenseChart
      class="x_chart"
      id="acceleration_chart"
      label="Acceleration"
      chartID="acc"
      :readOnly="readOnly"
      ref="accChartRef"
      :input="propertiesSourceController().senses.acc"
    ></SenseChart>
    <BaseLabel
      v-show="!isMobile()"
      id="sensorial_intensity_l"
      v-text="'Sensorial Intensity'"
      color="#8F34FF"
      ></BaseLabel>
      <BaseLabel
        v-show="!isMobile()"
      id="emotional_intensity_l"
      v-text="'Emotional Intensity'"
      color="#8F34FF"
    ></BaseLabel>
    <VerticalLine v-show="!isMobile()" id="properties_dock_ln_1" color="#0500FF00"></VerticalLine>
    <VerticalLine v-show="!isMobile()" id="properties_dock_ln_2" color="#0500FF00"></VerticalLine>
    <SenseChart ref="loveChartRef" :readOnly="readOnly" :input="propertiesSourceController().senses.love" class="x_chart_e" @loveChartUpdate="SenseChartUpdate" updateEventName="loveChartUpdate" chartID="love" id="love_chart" label="Love"></SenseChart>
    <SenseChart ref="fearChartRef" :readOnly="readOnly" :input="propertiesSourceController().senses.fear" class="x_chart_e" @fearChartUpdate="SenseChartUpdate" updateEventName="fearChartUpdate" chartID="fear" id="fear_chart" label="Fear"></SenseChart>
    <SenseChart ref="happinessChartRef" :readOnly="readOnly" :input="propertiesSourceController().senses.happiness" class="x_chart_e" @happinessChartUpdate="SenseChartUpdate" updateEventName="happinessChartUpdate" chartID="happiness" id="happiness_chart" label="Happiness"></SenseChart>
    <SenseChart ref="sadnessChartRef" :readOnly="readOnly" :input="propertiesSourceController().senses.sadness" class="x_chart_e" @sadnessChartUpdate="SenseChartUpdate" updateEventName="sadnessChartUpdate" chartID="sadness" id="sadness_chart" label="Sadness"></SenseChart>
    <SenseChart ref="angerChartRef" :readOnly="readOnly" :input="propertiesSourceController().senses.anger" class="x_chart_e" @angerChartUpdate="SenseChartUpdate" updateEventName="angerChartUpdate" chartID="anger" id="anger_chart" label="Anger"></SenseChart>
    
    <BaseLabel class="properties_dock_x_l" id="properties_dock_alpha_rel_score_l" v-text="'Realism'" color="#8F34FF"></BaseLabel>
    <input :readonly="readOnly" v-model="propertiesSourceController().scores.realism" type="number" :style="`color: ${realismPropColorSet.baseColor}; border: solid 1px ${realismPropColorSet.baseColor};`" class="properties_dock_x_acx" @mouseleave="propValueEditorMouseLeave" @mouseenter="propValueEditorMouseEnter($event, realismPropColorSet.hoverBkgColor)" @input="propertiesRangeOnInput($event, 'realismPropColorSet', false)" step="0.1" maxlength="4" max="1" min="0" id="properties_dock_realism_acx" value="1"></input>
    
    <BaseLabel class="properties_dock_x_l" id="properties_dock_continuity_score_l" v-text="'Continuity'" color="#8F34FF"></BaseLabel>
    <input :readonly="readOnly" v-model="propertiesSourceController().scores.continuity" id="properties_dock_continuity_acx" :style="`color: ${continuityPropColorSet.baseColor}; border: solid 1px ${continuityPropColorSet.baseColor};`" class="properties_dock_x_acx" @mouseleave="propValueEditorMouseLeave" @mouseenter="propValueEditorMouseEnter($event, continuityPropColorSet.hoverBkgColor)" @change="propertiesRangeOnInput($event, 'continuityPropColorSet')" @input="propertiesRangeOnInput($event, 'continuityPropColorSet')" type="number" step="0.1" maxlength="4" max="1" min="0" value="1"></input>
    
    <BaseLabel class="properties_dock_x_l" id="properties_dock_interpretation_score_l" v-text="'Active Interpretation'" color="#8F34FF"></BaseLabel>
    <input :readonly="readOnly" v-model="propertiesSourceController().scores.activeInterpretation" id="properties_dock_interpretation_acx" :style="`color: ${interpretationPropColorSet.baseColor}; border: solid 1px ${interpretationPropColorSet.baseColor};`" class="properties_dock_x_acx" @mouseleave="propValueEditorMouseLeave" @mouseenter="propValueEditorMouseEnter($event, interpretationPropColorSet.hoverBkgColor)" @input="propertiesRangeOnInput($event, 'interpretationPropColorSet', false)" type="number" step="0.1" maxlength="4" max="1" min="0" value="1"></input>
    
    <BaseLabel class="properties_dock_x_l" id="properties_dock_TRI_score_l" v-text="'Time Relativity Index'" color="#8F34FF"></BaseLabel>
    <input :readonly="readOnly" v-model="propertiesSourceController().scores.timeRelativityIndex" id="properties_dock_TRI_acx" :style="`color: ${TRIPropColorSet.baseColor}; border: solid 1px ${TRIPropColorSet.baseColor};`" class="properties_dock_x_acx" @mouseleave="propValueEditorMouseLeave" @mouseenter="propValueEditorMouseEnter($event, TRIPropColorSet.hoverBkgColor)" @input="propertiesRangeOnInput($event, 'TRIPropColorSet', false)" type="number" step="0.1" maxlength="4" max="1" min="0" value="1"></input>
    
    <BaseLabel class="properties_dock_x_l" id="properties_dock_JLE_score_l" v-text="'Jet Lag Effect'" color="#8F34FF"></BaseLabel>
    <input :readonly="readOnly" v-model="propertiesSourceController().scores.jetLagEffect" id="properties_dock_JLE_acx" :style="`color: ${JLEPropColorSet.baseColor}; border: solid 1px ${JLEPropColorSet.baseColor};`" class="properties_dock_x_acx" @mouseleave="propValueEditorMouseLeave" @mouseenter="propValueEditorMouseEnter($event, JLEPropColorSet.hoverBkgColor)" @input="propertiesRangeOnInput($event, 'JLEPropColorSet', true)" type="number" step="0.1" maxlength="4" max="1" min="0" value="0"></input>

    <HorizontalLine id="properties_dock_ln_3" color="#0500FF00"></HorizontalLine>

    <BaseLabel id="properties_total_score_l" v-text="'Total Score'" color="#8F34FF"></BaseLabel>
    <BaseLabel id="properties_total_score_acx" v-text="'8/10'" color="#00EA96"></BaseLabel>

    <HorizontalLine class="properties_dock_total_score_ln_x" id="properties_dock_total_score_ln_0" color="#00EA96"></HorizontalLine>
    <HorizontalLine class="properties_dock_total_score_ln_x" id="properties_dock_total_score_ln_1" color="#00EA96"></HorizontalLine>
    <HorizontalLine class="properties_dock_total_score_ln_x" id="properties_dock_total_score_ln_2" color="#00EA96"></HorizontalLine>
    <HorizontalLine class="properties_dock_total_score_ln_x" id="properties_dock_total_score_ln_3" color="#00EA96"></HorizontalLine>
    <HorizontalLine class="properties_dock_total_score_ln_x" id="properties_dock_total_score_ln_4" color="#00EA96"></HorizontalLine>
    <HorizontalLine class="properties_dock_total_score_ln_x" id="properties_dock_total_score_ln_5" color="#00EA96"></HorizontalLine>
    <HorizontalLine class="properties_dock_total_score_ln_x" id="properties_dock_total_score_ln_6" color="#00EA9660"></HorizontalLine>
    <HorizontalLine class="properties_dock_total_score_ln_x" id="properties_dock_total_score_ln_7" color="#00EA9660"></HorizontalLine>
    
    <HorizontalLine id="properties_dock_ln_4" color="#0500FF00"></HorizontalLine>
    
    <input :readonly="readOnly" v-model="propertiesSourceController().scores.start" type="datetime-local" id="properties_dock_dream_start_input"></input>
    <BaseLabel id="properties_dock_dream_start_l" v-text="'Started at:'" color="#8F34FF"></BaseLabel>

    <input :readonly="readOnly" v-model="propertiesSourceController().scores.duration" id="sleep_duration_input" class="properties_dock_x_acx" @input="sleepDurationOnInput" type="number" step="0.2" min="0" value="0"></input>
    <BaseLabel id="sleep_duration_hrs_l" v-text="'hrs'" color="#8F34FF"></BaseLabel>
    <BaseLabel id="sleep_duration_l" v-text="'Duration: '" color="#8F34FF"></BaseLabel>
</div>
</template>

<style scoped>
input[type='time']::-webkit-calendar-picker-indicator {
  filter: invert(48%) sepia(13%) saturate(3207%) hue-rotate(230deg)
    brightness(95%) contrast(80%);
  outline: none;
}
#properties_dock_dream_start_l {
  top: 83.261802575%;
  left: 72.849462366%;
  font-size: 1.6vh;
}
#properties_dock_dream_start_input {
  position: absolute;
  top: 83.261802575%;
  left: 80.903226%;
  color: #8f34ff;
  background-color: #00ea9600;
  border: solid 1px #8f34ff;
  font-size: 1.5vh;
  width: 18%;
  transition: all linear 0.1s;
}
#properties_dock_dream_start_input:focus {
  color: #bf8aff;
  outline: none;
}
#properties_dock_dream_start_input::selection {
  background-color: #aaaaaa80;
}
#properties_dock_total_score_ln_0 {
  top: 55.507868383%;
}
#properties_dock_total_score_ln_1 {
  top: calc(55.507868383% + (1 * 1.430615165%));
}
#properties_dock_total_score_ln_2 {
  top: calc(55.507868383% + (2 * 1.430615165%));
}
#properties_dock_total_score_ln_3 {
  top: calc(55.507868383% + (3 * 1.430615165%));
}
#properties_dock_total_score_ln_4 {
  top: calc(55.507868383% + (4 * 1.430615165%));
}
#properties_dock_total_score_ln_5 {
  top: calc(55.507868383% + (5 * 1.430615165%));
}
#properties_dock_total_score_ln_6 {
  top: calc(55.507868383% + (6 * 1.430615165%));
}
#properties_dock_total_score_ln_7 {
  top: calc(55.507868383% + (7 * 1.430615165%));
}
.properties_dock_total_score_ln_x {
  width: 3.494623656%;
  height: 0.858369099%;
  left: 84.498207885%;
}
#properties_total_score_acx {
  top: 49.642346209%;
  left: 83.691756272%;
  font-size: 2.5vh;
}
#properties_total_score_l {
  top: 44.062947067%;
  left: 80.913978495%;
  font-size: 2.5vh;
}
#properties_dock_ln_3,
#properties_dock_ln_4 {
  top: 40.486409156%;
  left: 72.670250896%;
  width: 25.806451613%;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #4900a7 0%,
    rgba(73, 0, 167, 0.15) 100%
  );
}
#properties_dock_ln_4 {
  top: 75.250357654%;
}
#properties_dock_JLE_acx {
  top: 34.334763948%;
}
#properties_dock_JLE_score_l {
  top: 34.620886981%;
}
#properties_dock_TRI_acx {
  top: 28.469241774%;
}
#properties_dock_TRI_score_l {
  top: 28.755364807%;
}
#properties_dock_realism_acx {
  top: 10.87267525%;
}
#properties_dock_interpretation_score_l {
  top: 22.889842632%;
}
#properties_dock_interpretation_acx {
  top: 22.603719599%;
}
.properties_dock_x_acx {
  position: absolute;
  left: 93.548387097%;
  outline: none;
  border: solid 1px #00ea96;
  font-size: 2vh;
  background-color: #00ea9600;
  color: #00ea96;
  width: 4.928315412%;
}
.properties_dock_x_acx::selection {
  background-color: #aaaaaa80;
}
#sleep_duration_hrs_l {
  top: 77.865665%;
  left: 86.849462%;
  font-size: 1.6vh;
}
#sleep_duration_l {
  top: 77.865665%;
  left: 72.849462366%;
  font-size: 1.6vh;
}
#sleep_duration_input {
  position: absolute;
  top: 77.365665%;
  left: 80.903226%;
  outline: none;
  border: solid 1px #8f34ff;
  font-size: 1.5vh;
  background-color: #00ea9600;
  color: #8f34ff;
  width: 4.928315412%;
  transition: color linear 0.1s;
}
#sleep_duration_input:hover {
  background-color: #8f34ff20;
}
#sleep_duration_input:focus {
  color: #bf8aff;
}
.properties_dock_x_l {
  left: 72.670250896%;
  font-size: 2vh;
}
#properties_dock_continuity_acx {
  top: 16.738197425%;
}
#properties_dock_continuity_score_l {
  top: 17.024320458%;
}
#properties_dock_alpha_rel_score_l {
  top: 11.158798283%;
}
#properties_dock_ln_1,
#properties_dock_ln_2 {
  top: 9.440191%;
  left: 35.394265233%;
  height: 88.8%;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #4900a7 0%,
    rgba(73, 0, 167, 0.15) 100%
  );
}
#properties_dock_ln_2 {
  left: 70.967741935%;
}
.x_chart {
  left: 38.440860215%;
}
.x_chart_e {
  left: 2.777777778%;
}
#acceleration_chart,
#anger_chart {
  top: calc(89.154704944% - 5%);
}
#smell_chart,
#sadness_chart {
  top: calc(71.610845295% - 5%);
}
#hearing_chart,
#happiness_chart {
  top: calc(54.066985646% - 5%);
}
#touch_chart,
#fear_chart {
  top: calc(36.523125997% - 5%);
}
#sight_chart,
#love_chart {
  top: calc(20.414673046% - 5%);
}
#sensorial_intensity_l,
#emotional_intensity_l {
  top: 9.440191%;
  left: 38.440860215%;
  font-size: 2vh;
}
#emotional_intensity_l {
  left: 2.777777778%;
}
#prop_ln_0 {
  top: 8.133971292%;
  left: 0%;
  width: 100%;
  background: linear-gradient(90deg, #4900a7 0%, rgba(73, 0, 167, 0.15) 100%);
}
#properties_l {
  top: 2.392344498%;
  left: 1.88172043%;
  font-size: 2.3vh;
}
.properties_dock_container {
  position: absolute;
  top: 32.962962963%;
  left: 11.979166667%;
  width: 58.125%;
  height: 64.722222222%;
  background: linear-gradient(
    174.97deg,
    rgba(36, 0, 82, 0.6) 0%,
    rgba(19, 0, 74, 0.6) 99.99%,
    rgba(15, 0, 74, 0.6) 100%
  );
}
@media only screen and (max-width: 700px) and (max-height: 900px) {

  .properties_dock_container {
    top: 9.34375%;
    left: 0%;
    width: 99.7%;
    height: 81.2875%;
    /* overflow-y: scroll; */
    background: #00000000;
  }

  .properties_dock_container::-webkit-scrollbar {
    width: 0vh;
    height: 0;
  }
  .properties_dock_container::-webkit-scrollbar-track {
    background-color: #4900a700;
  }
  .x_chart {
    left: 2.777777778%;
  }
  #acceleration_chart,
  #anger_chart {
    top: calc(89.154704944% - 6%);
  }
  #anger_chart {
    top: calc(89.154704944% + 4%);
    border: none;
  }
  #smell_chart,
  #sadness_chart {
    top: calc(71.610845295% - 9%);
  }
  #sadness_chart {
    top: calc(71.610845295% + 1%);
  }
  #hearing_chart,
  #happiness_chart {
    top: calc(54.066985646% - 13%);
  }
  #happiness_chart {
    top: calc(54.066985646% - 2%);
  }
  #touch_chart,
  #fear_chart {
    top: calc(36.523125997% - 15%);
  }
  #sight_chart,
  #love_chart {
    top: calc(20.414673046% - 20%);
  }
  #love_chart {
    top: calc(20.414673046% - 10%);
  }
  #fear_chart {
    top: calc(36.523125997% - 16%);
  }
  #touch_chart {
    top: calc(36.523125997% - 6%);
  }
}
</style>