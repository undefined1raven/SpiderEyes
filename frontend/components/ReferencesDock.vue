

<script setup>
import VerticalLine from '@/components/VerticalLine.vue'
import HorizontalLine from '@/components/HorizontalLine.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BaseButton from '@/components/BaseButton.vue'
</script>


<script>
export default {
  props: {
    readOnly: { default: false },
    refsIn: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  methods: {
    updateGlobalDreamObj() {
      this.$emit('updateDreamObj', { key: 'references', value: this.refs })
    },
    refOnClick(index) {
      if (!this.readOnly) {
        this.refSource()[index].isActive = !this.refs[index].isActive
        this.updateGlobalDreamObj()
      }
    },
    refStyleController(index) {
      if (this.refSource()[index].isActive) {
        return 'border: solid 1px #4700A3; background-color: #4700A340; color: #FFF;'
      } else {
        return 'border: solid 1px #4700A3; background-color: #4700A300; color: #888;'
      }
    },
    onSaveNewRef() {
      if (!this.readOnly) {
        if (
          this.$refs.newRefName.value.length > 0 &&
          this.$refs.newRefDescription.value.length > 0
        ) {
          this.refs.push({
            name: this.$refs.newRefName.value,
            description: this.$refs.newRefDescription.value,
          })
          this.$refs.newRefName.value = ''
          this.$refs.newRefDescription.value = ''
          this.updateGlobalDreamObj()
        } else {
          if (this.$refs.newRefName.value.length == 0) {
            this.newRefNameInputStyle = { bkg: '#0500FF10', border: '#FF003D' }
          }
          if (this.$refs.newRefDescription.value.length == 0) {
            this.newRefDescriptionInputStyle = {
              bkg: '#0500FF10',
              border: '#FF003D',
            }
          }
        }
      }
    },
    newRefNameOnInput() {
      this.newRefNameInputStyle = { bkg: '', border: '#4700A3' }
    },
    newRefDescriptionOnInput() {
      this.newRefDescriptionInputStyle = { bkg: '', border: '#4700A3' }
    },
    refOnMouseEnter(e, index) {
      if (!this.readOnly) {
        e.target.style.color = '#8F34FF'
        e.target.style.borderColor = '#8F34FF'
      }
      this.refDescriptionLabel.text = this.refSource()[index].description
      this.refDescriptionLabel.color = '#FFF'
    },
    refOnMouseLeave(e, index) {
      if (!this.readOnly) {
        e.target.style = this.refStyleController(index)
      }
      this.refDescriptionLabel.text =
        'Hover over a ref in the list to see it’s description'
      this.refDescriptionLabel.color = '#888'
    },
    refSource() {
      if (this.readOnly) {
        return this.refsIn
      } else {
        return this.refs
      }
    },
  },
  data() {
    return {
      refs: [],
      refDescriptionLabel: {
        text: 'Hover over a ref in the list to see it’s description',
        color: '#888',
      },
      newRefNameInputStyle: { bkg: '', border: '#4700A3' },
      newRefDescriptionInputStyle: { bkg: '', border: '#4700A3' },
    }
  },
}
</script>

<template>
  <div class="references_dock_container">
    <BaseLabel
      class="references_dock_l"
      v-text="'References'"
      color="#8F34FF"
    ></BaseLabel>
    <HorizontalLine
      class="references_dock_ln_0"
      color="#0500FF00"
    ></HorizontalLine>
    <ul class="ref_list">
      <div
        class="ref_selector"
        v-for="(ref, index) in refSource()"
        :key="index"
        v-text="ref.name"
        :style="refStyleController(index)"
        @click="refOnClick(index)"
        @mouseenter="refOnMouseEnter($event, index)"
        @mouseleave="refOnMouseLeave($event, index)"
      ></div>
    </ul>
    <VerticalLine class="references_dock_ln_1" color="#0500ff00"></VerticalLine>
    <BaseLabel class="new_ref_name_l" v-text="'Enter the name of the reference'" color="#8F34FF"></BaseLabel>
    <input :readOnly="readOnly" @input="newRefNameOnInput" :style="`background-color: ${newRefNameInputStyle.bkg}; border: solid 1px ${newRefNameInputStyle.border};`" ref="newRefName" type="text" class="new_ref_name_text_input" spellcheck="false"></input>
    <BaseLabel class="new_ref_description_l" v-text="'Reference Description'" color="#8F34FF"></BaseLabel>
    <textarea :readOnly="readOnly" @input="newRefDescriptionOnInput" :style="`background-color: ${newRefDescriptionInputStyle.bkg}; border: solid 1px ${newRefDescriptionInputStyle.border};`" ref="newRefDescription" type="text" class="new_ref_description_text_input" spellcheck="false"></textarea>
    <HorizontalLine class="references_dock_ln_2" color="#0500ff00"></HorizontalLine>
    <BaseButton onClickEventName="onSaveNewRef" @onSaveNewRef="onSaveNewRef" class="new_ref_btn" width="38.93129771%" height="4.465709729%" :label="{text: 'Save New Reference', fontSize: '2vh'}"></BaseButton>
    <BaseLabel class="ref_description_l" v-text="refDescriptionLabel.text" :color="refDescriptionLabel.color"></BaseLabel>  
  </div>
</template>

<style scoped>
.ref_description_l {
  top: 65.390749601%;
  left: 2.480916031%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55.34351145%;
  height: 32.216905901%;
  text-align: center;
  font-size: 1.8vh;
  transition: all linear 0.1s;
}
.new_ref_btn {
  top: 56.459330144%;
  left: 10.687022901%;
}
.references_dock_ln_2 {
  top: 62.83891547%;
  left: 2.480916031%;
  width: 54.34351145%;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #4900a7 0%,
    rgba(73, 0, 167, 0.15) 100%
  );
}
.new_ref_name_text_input,
.new_ref_description_text_input {
  position: absolute;
  background-color: #0b001a00;
  border: solid 1px #4700a3;
  width: 53.34351145%;
  height: 4.625199362%;
  top: 17.703349282%;
  left: 2.480916031%;
  outline: none;
  color: #8f34ff;
  font-size: 2vh;
  transition: all linear 0.07s;
  transition: color linear 0.12s;
  transition: border linear 0.1s;
}
.new_ref_description_text_input {
  display: flex;
  top: 31.100478469%;
  height: 22.217557%;
  font-family: 'Electrolize', sans-serif;
  justify-content: flex-start;
  align-items: flex-start;
  resize: none;
}
.new_ref_name_text_input:hover,
.new_ref_description_text_input:hover {
  background-color: #4700a340;
}
.new_ref_name_text_input:focus,
.new_ref_description_text_input:focus {
  color: #bf8aff;
}
.new_ref_name_text_input::selection,
.new_ref_description_text_input::selection {
  background-color: #88888840;
}
.new_ref_name_l,
.new_ref_description_l {
  top: 13.55661882%;
  left: 2.480916031%;
  font-size: 1.9vh;
}
.new_ref_description_l {
  top: 26.953748006%;
}
.references_dock_ln_1 {
  top: 10.685805423%;
  left: 60.114503817%;
  height: 86.92185008%;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #4900a7 0%,
    rgba(73, 0, 167, 0.15) 100%
  );
}
.ref_selector {
  position: relative;
  width: 99%;
  height: 200%;
  border: solid 1px #4700a3;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Electrolize', sans-serif;
  font-size: 1.9vh;
  color: #888;
  user-select: none;
  transition: all linear 0.07s;
  transition: color linear 0.12s;
}
.ref_list {
  position: absolute;
  top: 10.685805423%;
  left: 64.503816794%;
  width: 31.297709924%;
  height: 86.92185008%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(8, 1fr);
  overflow-y: scroll;
  row-gap: 8%;
  padding-right: 2%;
}
.references_dock_l {
  top: 2.073365231%;
  left: 2.86259542%;
}
.references_dock_ln_0 {
  top: 8.833971292%;
  width: 100%;
  left: 0%;
  background: linear-gradient(90deg, #4900a7 0%, rgba(73, 0, 167, 0.15) 100%);
}
.references_dock_container {
  position: absolute;
  top: 32.962962963%;
  left: 71.40625%;
  width: 27.291666667%;
  height: 58.055555556%;
  background: linear-gradient(
    174.97deg,
    rgba(36, 0, 82, 0.6) 0%,
    rgba(19, 0, 74, 0.6) 99.99%,
    rgba(15, 0, 74, 0.6) 100%
  );
}
</style>