
<script setup>
import VerticalLine from '@/components/VerticalLine.vue'
import HorizontalLine from '@/components/HorizontalLine.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import AnalyticsNavBar from '@/components/AnalyticsNavBar.vue'
import rangeScaler from '@/composables/rangeScaler.ts'
</script>

<script>
export default {
  props: {
    isDreamSelected: { default: false },
    onClickEventName: { default: '' },
    ix: { default: 0 },
    dream: {
      type: Object,
      default: () => ({
        longDescription: '',
        typeTimeline: {
          typeTimelineStages: [],
          colorSet: {
            naturalDreamTypeColor: '#8F34FF',
            hybridDreamTypeColor: '#8D7AFF',
            activeDreamTypeColor: '#0500FF',
          },
          isAwarnenessHigh: true,
        },
        contentTags: [],
        dreamID: `DX-${this.ix}`,
        properties: { senses: {}, scores: { duration: 0 } },
        qualityTags: [
          { tag: '8', tagColor: '#00EA96' },
          { tag: 'H', tagColor: '#6F00FF' },
        ],
      }),
    },
  },
  methods: {
    parseStartTime(startString) {
      if (startString) {
        let dateTime = new Date(startString)
        return startString.split('T')[0]
      }
    },
    onMouseEnter() {
      this.isMouseHovering = true
    },
    onMouseLeave() {
      this.isMouseHovering = false
    },
    mouseHoverHandler(isMouseHovering) {
      if (!this.isDreamSelected) {
        if (isMouseHovering) {
          return { color: '#6F00FF', bkgColor: '#23005060' }
        } else {
          return { color: '#4700A3', bkgColor: '#23005000' }
        }
      } else {
        return { color: '#6F00FF', bkgColor: '#23005060' }
      }
    },
    unix_tx_formatter(unix_time) {
      let dt = new Date(unix_time)
      return `${('0' + dt.getDay()).slice(-2)}.${('0' + dt.getMonth()).slice(
        -2
      )}.${dt.getFullYear().toString()[2]}${dt.getFullYear().toString()[3]}`
    },
    parseTypeSegmentLength(index, SegmentsArrayLength, SegmentLength) {
      if (index + 1 == SegmentsArrayLength) {
        return SegmentLength
      } else {
        return SegmentLength - 2 //offset 2% right margin
      }
    },
    parseQualityTags(isScore, input) {
      if (!isScore) {
        let awarenessHash = { true: 1, false: 0 }
        let awarenessDisplayLabelHash = { true: 'H', false: 'L' }
        let tagColor = `rgb(${rangeScaler(
          awarenessHash[input],
          0,
          1,
          255,
          0
        )}, ${rangeScaler(awarenessHash[input], 0, 1, 0, 255)}, 150)`
        return { tag: awarenessDisplayLabelHash[input], tagColor: tagColor }
      } else {
        let tagColor = `rgb(${rangeScaler(input, 0, 1, 255, 0)}, ${rangeScaler(
          input,
          0,
          1,
          0,
          255
        )}, 150)`
        return { tag: input, tagColor: tagColor }
      }
    },
    parseDisplayTags() {
      let displayTags = []
      for (let ix = 0; ix < this.dream.contentTags.length; ix++) {
        if (displayTags.length <= 2 && this.dream.contentTags[ix].isActive) {
          displayTags.push(this.dream.contentTags[ix])
        }
      }
      return displayTags
    },
    dreamTimelineEntryOnClick() {
      this.$emit(this.onClickEventName, { index: this.ix })
    },
  },
  data() {
    return {
      isMouseHovering: false,
      dreamTypeColorHash: {
        Active: '#6100FF',
        Natural: '#0047FF',
        Hybrid: '#FF00D6',
      },
    }
  },
}
</script>

<template>
  <div
    @click="dreamTimelineEntryOnClick"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    :style="`background-color: ${mouseHoverHandler(isMouseHovering).bkgColor};`"
    class="dream_timeline_entry_item_container"
  >
    <VerticalLine
      class="deco_ln_0 deco_ln_x"
      :color="mouseHoverHandler(isMouseHovering).color"
    ></VerticalLine>
    <VerticalLine
      class="deco_ln_1 deco_ln_x"
      :color="mouseHoverHandler(isMouseHovering).color"
    ></VerticalLine>
    <VerticalLine
      class="deco_ln_2 deco_ln_x"
      :color="mouseHoverHandler(isMouseHovering).color"
    ></VerticalLine>
    <div
      class="details_border"
      :style="`border: solid 1px ${mouseHoverHandler(isMouseHovering).color}`"
    ></div>
    <ul class="content_tags_list">
      <BaseLabel
        class="content_tag"
        color="#6F00FF"
        v-for="(contentTag, ix) in parseDisplayTags()"
        :key="ix"
        v-text="contentTag.tag"
      ></BaseLabel>
    </ul>
    <ul class="quality_tags_list">
      <BaseLabel
        class="quality_tag"
        v-for="(qualityTag, ix) in [
          parseQualityTags(false, dream.typeTimeline.isAwarnenessHigh),
          parseQualityTags(true, dream.properties.scores.realism),
        ]"
        :key="ix"
        v-text="qualityTag.tag"
        :style="`color: ${qualityTag.tagColor}; border: solid 1px ${qualityTag.tagColor};}`"
      ></BaseLabel>
    </ul>
    <BaseLabel class="dreamID_l" v-text="`DX-${ix}`"></BaseLabel>
    <BaseLabel
      class="timestamp_l"
      v-text="parseStartTime(dream.properties.scores.start)"
    ></BaseLabel>
    <BaseLabel
      class="duration_l"
      v-text="`${dream.properties.scores.duration}hrs`"
    ></BaseLabel>
    <ul class="dream_timeline_list">
      <HorizontalLine
        class="type_segment"
        v-for="(typeSegment, ix) in dream.typeTimeline.typeTimelineStages"
        :key="ix"
        :style="`width: ${parseTypeSegmentLength(
          ix,
          dream.typeTimeline.typeTimelineStages.length,
          typeSegment.duration
        )}%; background-color: ${
          dream.typeTimeline.colorSet[`${typeSegment.type}DreamTypeColor`]
        }`"
      ></HorizontalLine>
    </ul>
  </div>
</template>

<style scoped>
.type_segment {
  position: relative;
  height: 100%;
  margin-right: 2%;
}
.dream_timeline_list {
  top: 91.463414634%;
  left: 13.537810945%;
  width: 86.069651741%;
  height: 4.87804878%;
}
.duration_l {
  top: 1.219512195%;
  left: 55.223880597%;
  width: 43.28358209%;
  font-size: 1.8vh;
  display: flex;
  justify-content: flex-end;
}
.timestamp_l {
  top: 1.219512195%;
  left: 12.437810945%;
  font-size: 1.8vh;
}
.dreamID_l {
  top: 29.268292683%;
  left: 12.437810945%;
  font-size: 1.8vh;
}
.content_tag,
.quality_tag {
  position: relative;
  width: auto;
  height: 100%;
  border: solid 1px #6f00ff;
  border-radius: 6px;
  font-size: 16px;
  margin-left: 1%;
  margin-right: 1%;
  padding-left: 2%;
  padding-right: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.quality_tag {
  margin-right: 3%;
}
.content_tags_list,
.quality_tags_list {
  top: 62.195121951%;
  left: 12.437810945%;
  width: 86.069651741%;
  height: 21.951219512%;
  align-items: center;
  justify-content: center;
  flex-flow: row;
}
.quality_tags_list {
  top: 29.268292683%;
  left: 55.25122%;
  width: 44.390243902%;
  justify-content: end;
}
.details_border {
  position: absolute;
  top: 0%;
  left: 11.44278607%;
  border: solid 1px #4700a3;
  width: 88.059701493%;
  height: 97.5%;
}
.deco_ln_2 {
  left: 6.467661692%;
  width: 4.975124378%;
}
.deco_ln_1 {
  left: 1.990049751%;
  width: 3.482587065%;
}
.deco_ln_0 {
  left: 0%;
  width: 0.995024876%;
}
.deco_ln_x {
  top: 0%;
  height: 100%;
}
.dream_timeline_entry_item_container {
  position: relative;
  width: 100%;
  height: 900%;
  margin-bottom: 4.99378882%;
}
@media only screen and (max-width: 700px) and (max-height: 900px) {
  .dream_timeline_entry_item_container {
    height: 490%;
  }
}
</style>