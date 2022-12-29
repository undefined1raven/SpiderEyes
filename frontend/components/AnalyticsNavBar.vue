
<script setup>
import VerticalLine from '@/components/VerticalLine.vue'
import HorizontalLine from '@/components/HorizontalLine.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BaseButton from '@/components/BaseButton.vue'
import DreamTimelineEntryItem from '@/components/DreamTimelineEntryItem.vue'
import Logo from '@/components/Logo.vue'
</script>

<script>
export default {
  methods: {
    onLogoutButtonClick(){
      sessionStorage.clear()
      window.location.pathname = 'login'
    },
    dreamTimelineEntryItemOnClick(args) {
      this.$emit('newDreamSelected', { index: args.index })
    },
    onLogNewDream() {
      this.$emit('createNewDream')
      this['activeWindowIndicatorTop'] = '13.148148148%'
    },
    onViewAnalytics() {
      this.$emit('onViewAnalytics')
      this['activeWindowIndicatorTop'] = '17.314814815%'
    },
  },
  props: {
    un: { default: '--' },
    retrievedDreams: {
      type: Array,
      default: () => {
        return []
      },
    },
    isInViewDreamMode: {
      type: Object,
      default: () => {
        return { status: false, index: 0 }
      },
    },
  },
  data() {
    return {
      activeWindowIndicatorTop: '13.148148148%',
      dreamsArray: [{ id: 0 }, { id: 1 }],
    }
  },
}
</script>

<template>
  <div class="analytics_nav_bar_container">
    <Logo id="logo"></Logo>
    <BaseLabel
      id="spiderEyes_l"
      color="#5600C1"
      v-text="'Spider Eyes'"
    ></BaseLabel>
    <HorizontalLine
      id="logo_ln"
      class="gradient_ln"
      color="#00000000"
    ></HorizontalLine>
    <BaseButton
      id="log_new_dream_btn"
      width="94.146341463%"
      height="3.055555556%"
      :baseColorSet="{ text: '#8F34FF', bkg: '#30006B00', border: '#30006B' }"
      :HoverColorSet="{ text: '#CA9FFF', bkg: '#30006B60', border: '#30006B' }"
      :label="{ text: 'Log New Dream', fontSize: '2vh' }"
      onClickEventName="onLogNewDream"
      @onLogNewDream="onLogNewDream"
    ></BaseButton>
    <BaseButton
      id="view_analytics_btn"
      width="94.146341463%"
      height="3.055555556%"
      :baseColorSet="{ text: '#8F34FF', bkg: '#30006B00', border: '#30006B' }"
      :HoverColorSet="{ text: '#CA9FFF', bkg: '#30006B60', border: '#30006B' }"
      :label="{ text: 'View Analytics', fontSize: '2vh' }"
      onClickEventName="onViewAnalytics"
      @onViewAnalytics="onViewAnalytics"
    ></BaseButton>
    <VerticalLine
      id="active_window_indi"
      v-if="!isInViewDreamMode.status"
      :style="`top: ${activeWindowIndicatorTop};`"
      color="#5C00CD"
    ></VerticalLine>
    <HorizontalLine
      id="timeline_ln"
      class="gradient_ln"
      color="#00000000"
    ></HorizontalLine>
    <BaseLabel id="timeline_l" v-text="'Timeline'" color="#770AFF"></BaseLabel>
    <ul id="timeline_list" v-if="retrievedDreams.length > 0">
      <DreamTimelineEntryItem
        v-for="(dream, index) in retrievedDreams"
        :key="index"
        :ix="index"
        :dream="dream"
        :isDreamSelected="
          index == isInViewDreamMode.index && isInViewDreamMode.status
        "
        onClickEventName="dreamTimelineEntryItemOnClick"
        @dreamTimelineEntryItemOnClick="dreamTimelineEntryItemOnClick"
      ></DreamTimelineEntryItem>
    </ul>
    <HorizontalLine id="timeline_ln_2" color="#410093"></HorizontalLine>
    <BaseLabel
      id="logged_in_as_l"
      v-text="'Logged in as'"
      color="#770AFF"
    ></BaseLabel>
    <BaseLabel id="un_l" v-text="un" color="#770AFF"></BaseLabel>
    <div @click="onLogoutButtonClick" id="logout_btn" v-text="'Log Out'" color="#770AFF"></div>

  </div>
</template>

<style scoped>
#logout_btn{
  position: absolute;
  color: #8F34FF;
  user-select: none;
  top: 94.676691729%;
  left: 58.048780488%;
  width: 41.751219512%;
  background-color: #4900a700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6vh;
  height: 5.229323308%;
  border-left: solid 1px #4900a7;
}
#logout_btn:hover{
  background-color: #4900a740;
}
#timeline_ln_2 {
  top: 94.676691729%;
  left: 0%;
  width: 100%;
}
#logged_in_as_l,
#un_l {
  font-size: 1.6vh;
  top: 95.146616541%;
  left: 2.926829268%;
}
#un_l {
  top: 97.526315789%;
}
#timeline_list {
  top: 25.092592593%;
  left: 0.975609756%;
  width: 98.048780488%;
  height: 68.206766917%;
  flex-flow: column;
  display: grid;  
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(8, 1fr);
  overflow-y: scroll;
  row-gap: 15%;
}
#timeline_list::-webkit-scrollbar {
  width: 0vh;
  height: 0;
}
#timeline_list::-webkit-scrollbar-track {
  background-color: #4900a700;
}
#timeline_l {
  top: 22.12962963%;
}
#timeline_ln {
  top: 21.481481481%;
}
#active_window_indi {
  height: 3.205555556%;
  left: 0.5%;
  width: 0.25vh;
  transition: all ease-in-out 0.06s;
}
#view_analytics_btn {
  top: 17.314814815%;
}
#log_new_dream_btn {
  top: 13.148148148%;
}
.gradient_ln {
  left: 0%;
  width: 100%;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #4900a7 0%,
    rgba(73, 0, 167, 0.05) 100%
  );
}
#logo_ln {
  top: 11.944444444%;
}
#spiderEyes_l {
  top: 8.148148148%;
  font-size: 3vh;
}
#logo {
  top: 0.648148148%;
}
.analytics_nav_bar_container {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 10.677083333%;
  height: 97.718518519%;
  background: linear-gradient(
    174.97deg,
    rgba(36, 0, 82, 0.6) 0%,
    rgba(19, 0, 74, 0.6) 99.99%,
    rgba(15, 0, 74, 0.6) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>