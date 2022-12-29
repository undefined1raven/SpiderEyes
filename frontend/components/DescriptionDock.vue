
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
  props: {
    readOnly: { default: false },
    description: { default: "i keep having this dream. im just staring into the black between the stars. there's something there, i know there is. i can't see it, but it sees me, it sees everything. you know what i'm talking about, or you will soon." },
  },
  data() {
    return {
      desc: this.description,
    }
  },
  mounted() {
    this.$emit('updateDreamObj', {
      key: 'longDescription',
      value: this.desc,
    })
  },
  methods: {
    longDescriptionOnInput(e) {
      this.$emit('updateDreamObj', {
        key: 'longDescription',
        value: e.target.value,
      })
    },
    readOnlyCursorSelector() {
      if (!this.readOnly) {
        return 'cursor: text;'
      } else {
        return 'cursor: default;'
      }
    },
  },
}
</script>

<template>
  <div class="description_dock_container">
    <BaseLabel
      id="description_l"
      v-text="'Description'"
      color="#8F34FF"
    ></BaseLabel>
    <HorizontalLine
      id="description_dock_ln_0"
      color="#0500FF00"
    ></HorizontalLine>
    <textarea
      v-model="description"
      @input="longDescriptionOnInput"
      :readonly="readOnly"
      :style="readOnlyCursorSelector()"
      spellcheck="false"
      id="description_acx"
      v-text="description"
      color="#8F34FF"
    ></textarea>
  </div>
</template>

<style scoped>
.normal_cursor {
  cursor: pointer;
}
textarea {
  resize: none;
}
#description_acx::selection {
  background-color: #aaaaaa30;
}
#description_acx::-webkit-scrollbar {
  width: 0.5vh;
}
#description_acx::-webkit-scrollbar-track {
  background-color: #4900a750;
}

#description_acx::-webkit-scrollbar-thumb {
  background-color: #4900a7;
}
#description_acx {
  position: absolute;
  background-color: #4900a700;
  outline: none;
  top: 20.440251572%;
  left: 3.896103896%;
  width: 96.103896104%;
  height: 78.301886792%;
  font-size: 1.9vh;
  overflow-y: scroll;
  border: none;
  display: flex;
  color: #8f34ff;
  padding: 0;
  font-family: 'Electrolize', sans-serif;
  margin: 0;
}
#description_l {
  top: 4.402515723%;
  left: 3.896103896%;
  font-size: 2.3vh;
}
#description_dock_ln_0 {
  top: 16.037735849%;
  left: 0%;
  width: 100%;
  background: linear-gradient(90deg, #4900a7 0%, rgba(73, 0, 167, 0.15) 100%);
}
.description_dock_container {
  position: absolute;
  top: 2.037037037%;
  left: 11.979166667%;
  width: 40.104166667%;
  height: 29.444444444%;
  background: linear-gradient(
    174.97deg,
    rgba(36, 0, 82, 0.6) 0%,
    rgba(19, 0, 74, 0.6) 99.99%,
    rgba(15, 0, 74, 0.6) 100%
  );
}
</style>