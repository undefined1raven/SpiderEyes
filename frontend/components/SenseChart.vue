

<script setup>
import VerticalLine from '@/components/VerticalLine.vue'
import HorizontalLine from '@/components/HorizontalLine.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BaseButton from '@/components/BaseButton.vue'
</script>

<script>
export default {
  props: {
    label: { default: '' },
    chartID: { default: '' },
    updateEventName: { default: '' },
    readOnly: { default: false },
    input: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      refreshKey: 0,
      isMouseDown: false,
      isEnabled_0: 'inactive',
      isEnabled_1: 'inactive',
      isEnabled_2: 'inactive',
      isEnabled_3: 'inactive',
      isEnabled_4: 'inactive',
      isEnabled_5: 'inactive',
      isEnabled_6: 'inactive',
      isEnabled_7: 'inactive' /*idk y but v-for wouldn't work with an array */,
      maxIntensityValue: -1,
      timelinePoints: [],
      timelineMouseXY: { x: -1, y: -1 },
    }
  },
  mounted(){
    // setInterval(() => {
    //   this.redraw()
    // }, 50);
  },
  expose: ['redraw'],
  methods: {
    redraw() {
      if (this.readOnly) {
        if (this.input.maxIntensityValue > -1) {
          for (let ix = 0; ix <= this.input.maxIntensityValue; ix++) {
            this[`isEnabled_${ix}`] = 'active'
          }
          for (let ix = this.input.maxIntensityValue + 1; ix <= 7; ix++) {
            this[`isEnabled_${ix}`] = 'inactive'
          }
        }
        else{
          for (let ix = 0; ix <= 7; ix++) {
            this[`isEnabled_${ix}`] = 'inactive'
          }
        }
      }
    },
    sendUpstreamUpdate() {
      this.$emit(this.updateEventName, {
        maxIntensityValue: this.maxIntensityValue,
        timelinePoints: this.timelinePoints,
        chartID: this.chartID,
      })
    },
    SenseChartTimelineOnMouseDown() {
      this.isMouseDown = true
    },
    SenseChartTimelineOnMouseUp() {
      this.isMouseDown = false
    },
    genTimeline() {
      // if (this.readOnly) {
      //   for (let ix = 0; ix < this.input.timelinePoints.length; ix++) {
      //     let box = document.getElementsByClassName('sense_chart_timeline_graph_container')[0].getBoundingClientRect()

      //     let x = (this.input.timelinePoints[ix].x - box.left) * -1
      //     let y = (this.input.timelinePoints[ix].y - box.top) * -1

      //     console.log(`x :${x} | y: ${y}`)

      //     let point = document.createElement('div')
      //     point.className = 'sense_chart_timeline_graph_point'
      //     point.style.position = 'absolute'
      //     point.style.height = `${(box.height - y) * -1}px`
      //     point.style.width = `2%`
      //     point.style.backgroundColor = `#7200ff`
      //     point.style.top = `${y}px`
      //     point.style.left = `${x}px`
      //     if (x > 4 && y > 4) {
      //       this.$refs.SenseChartTimeline.appendChild(point)
      //     }
      //   }
      // }
    },
    SenseChartTimelineOnClick(e) {
      if (!this.readOnly && this.isMouseDown) {
        let target = e.target
        let box = target.getBoundingClientRect()

        let x = e.clientX - box.left
        let y = e.clientY - box.top

        this.timelinePoints.push({ x: x, y: y })
        let point = document.createElement('div')
        point.className = 'sense_chart_timeline_graph_point'
        point.style.position = 'absolute'
        point.style.height = `${box.height - y}px`
        point.style.width = `2%`
        point.style.backgroundColor = `#7200ff`
        point.style.top = `${y}px`
        point.style.left = `${x}px`
        if (x > 4 && y > 4) {
          this.$refs.SenseChartTimeline.appendChild(point)
        }
        this.sendUpstreamUpdate()
      }
    },
    SenseChartOnReset() {
      for (let ix = 0; ix <= 7; ix++) {
        this[`isEnabled_${ix}`] = 'inactive'
      }
      this.maxIntensityValue = -1
      this.timelinePoints = []
      this.$refs.SenseChartTimeline.innerHTML = ''
      this.sendUpstreamUpdate()
    },
    maxIntensitySegmentOnClick(index) {
      if (!this.readOnly) {
        for (let ix = 0; ix <= 7; ix++) {
          this[`isEnabled_${ix}`] = 'inactive'
        }
        for (let ix = 0; ix <= index; ix++) {
          this[`isEnabled_${ix}`] = 'active'
          this.maxIntensityValue = ix
        }
        this.sendUpstreamUpdate()
      }
    },
    maxIntensitySegmentOnHoverController(index) {
      if (!this.readOnly) {
        return '0'
      } else {
        let segmentID = `isEnabled_${index}`
        if (this[segmentID] == 'active') {
          return 'background-color: #7200ff'
        } else {
          return 'background-color: #260056'
        }
      }
    },
  },
}
</script>

<template>
  <div class="sense_chart_container" :key="refreshKey">
    <BaseLabel class="sense_chart_l" color="#7200FF" v-text="label"></BaseLabel>
    <BaseButton
      v-if="!readOnly"
      class="sense_chart_reset_btn"
      width="17.220543807%"
      height="26.666666667%"
      onClickEventName="SenseChartOnReset"
      @SenseChartOnReset="SenseChartOnReset"
      :label="{ text: 'Reset', fontSize: '1.9vh' }"
    ></BaseButton>
    <ul class="sense_chart_max_intensity_container">
      <div
        :class="['sense_chart_max_intensity_segment', `${isEnabled_0}`]"
        :style="maxIntensitySegmentOnHoverController(0)"
        @click="maxIntensitySegmentOnClick(0)"
      ></div>
      <div
        :class="['sense_chart_max_intensity_segment', `${isEnabled_1}`]"
        :style="maxIntensitySegmentOnHoverController(1)"
        @click="maxIntensitySegmentOnClick(1)"
      ></div>
      <div
        :class="['sense_chart_max_intensity_segment', `${isEnabled_2}`]"
        :style="maxIntensitySegmentOnHoverController(2)"
        @click="maxIntensitySegmentOnClick(2)"
      ></div>
      <div
        :class="['sense_chart_max_intensity_segment', `${isEnabled_3}`]"
        :style="maxIntensitySegmentOnHoverController(3)"
        @click="maxIntensitySegmentOnClick(3)"
      ></div>
      <div
        :class="['sense_chart_max_intensity_segment', `${isEnabled_4}`]"
        :style="maxIntensitySegmentOnHoverController(4)"
        @click="maxIntensitySegmentOnClick(4)"
      ></div>
      <div
        :class="['sense_chart_max_intensity_segment', `${isEnabled_5}`]"
        :style="maxIntensitySegmentOnHoverController(5)"
        @click="maxIntensitySegmentOnClick(5)"
      ></div>
      <div
        :class="['sense_chart_max_intensity_segment', `${isEnabled_6}`]"
        :style="maxIntensitySegmentOnHoverController(6)"
        @click="maxIntensitySegmentOnClick(6)"
      ></div>
      <div
        :class="['sense_chart_max_intensity_segment', `${isEnabled_7}`]"
        :style="maxIntensitySegmentOnHoverController(7)"
        @click="maxIntensitySegmentOnClick(7)"
      ></div>
    </ul>
    <div
      ref="SenseChartTimeline"
      @mousedown="SenseChartTimelineOnMouseDown"
      @mouseup="SenseChartTimelineOnMouseUp"
      @mousemove="SenseChartTimelineOnClick"
      class="sense_chart_timeline_graph_container"
    ></div>
  </div>
</template>


<style scoped>
.sense_chart_timeline_graph_point {
  position: absolute;
  width: 5%;
  background-color: #7200ff;
}
.sense_chart_timeline_graph_container {
  position: absolute;
  top: 60%;
  left: 0%;
  width: 99%;
  height: 40%;
  border-left: solid 1px #7200ff;
  border-bottom: solid 1px #7200ff;
  z-index: 100;
  cursor: crosshair;
  user-select: none;
}
.sense_chart_reset_btn {
  top: 0;
  left: 81.179456%;
}
.active {
  background-color: #7200ff;
}
.inactive {
  background-color: #260056;
}
.sense_chart_max_intensity_segment {
  position: relative;
  width: 11.782477341%;
  margin-right: 0.906344411%;
  height: 100%;
  transition: all linear 0.08s;
}
.sense_chart_max_intensity_segment:hover {
  background-color: #dfdfdf;
}
.sense_chart_max_intensity_container {
  position: absolute;
  top: 39.0625%;
  left: 0%;
  width: 100%;
  height: calc(9.375% + 5%);
}
.sense_chart_l {
  top: 0%;
  left: 0%;
  font-size: 2vh;
}
.sense_chart_container {
  position: absolute;
  width: 29.659498208%;
  height: 13.590844063%;
}
</style>