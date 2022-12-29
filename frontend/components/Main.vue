
<script setup>
import VerticalLine from '@/components/VerticalLine.vue'
import HorizontalLine from '@/components/HorizontalLine.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BaseButton from '@/components/BaseButton.vue'
import AnalyticsNavBar from '@/components/AnalyticsNavBar.vue'
import SenseChart from '@/components/SenseChart.vue'
import PropertiesDock from '@/components/PropertiesDock.vue'
import DescriptionDock from '@/components/DescriptionDock.vue'
import MainSaveButtonDeco from '@/components/MainSaveButtonDeco.vue'
import ContentTagsDock from '@/components/ContentTagsDock.vue'
import TypeTimelineDock from '@/components/TypeTimelineDock.vue'
import ReferencesDock from '@/components/ReferencesDock.vue'
</script>


<script>
export default {
  methods: {
    dreamFetcher(number, AT) {
      return this.$axios.get(
        `https://spidereyes-api.vercel.app/api/dbop?fetchDreams=${number}&AT=${AT}`
      )
    },
    descriptionDockOnUpdateDreamObj(args) {
      this.dreamObj[args.key] = args.value
    },
    async fetch(url) {
      await fetch(url)
        .then((res) =>
          res.json().then((r) => {
            this.data = r
          })
        )
        .catch((e) => {
          this.data = `Failed To Retrieve Data`
        })
    },
    newDreamSelected(args) {
      this.isInViewDreamMode.status = true
      this.isInViewDreamMode.index = args.index
      setTimeout(() => {
        this.$refs.propertiesDockRef.globalChartsRedraw()
      }, 50)
    },
    createNewDream() {
      this.isInViewDreamMode.status = false
      this.isInViewAnalyticsMode = false
      this.isInViewDreamMode.index = 0
    },
    onViewAnalytics() {
      this.isInViewAnalyticsMode = true
      this.isInViewDreamMode.status = false
    },
    dreamRetriever() {
      if (this.retrievedDreams.length > 0) {
        return this.retrievedDreams[this.isInViewDreamMode.index]
      } else {
        return {
          longDescription: '',
          contentTags: [],
          properties: { scores: { realism: 1 } },
          typeTimeline: { colorSet: {} },
          references: [],
        }
      }
    },
    saveButtonTextController() {
      if (this.isInViewDreamMode.status) {
        let date = new Date(
          this.retrievedDreams[this.isInViewDreamMode.index].tx
        )
        return {
          label: `Logged ${date.toDateString()} at ${date.toLocaleTimeString()}`,
          fontSize: '1.7vh',
          HoverColorSet: {
            text: '#770AFF',
            bkg: '#23005000',
            border: '#770AFF',
          },
        }
      } else {
        return {
          label: 'Log New Dream',
          fontSize: '2.1vh',
          HoverColorSet: {
            text: '#770AFF',
            bkg: '#770AFF20',
            border: '#770AFF',
          },
        }
      }
    },
    onSaveDream() {
      if (!this.isInViewDreamMode.status) {
        this.dreamObj['tx'] = Date.now()
        this.decoIsActive = false
        this.$axios
          .post(
            `https://spidereyes-api.vercel.app/api/dbop?saveDream=0&AT=${this.AT}`,
            this.dreamObj
          ) //https://spidereyes-api.vercel.app/api/dbop
          .then((r) => {this.decoIsActive = true})
          .catch((e) => {})
      }
    },
  },
  mounted() {
    this.AT = sessionStorage.getItem('AT')
    this.username = sessionStorage.getItem('un')
    if (this.AT != undefined) {
      if (this.AT != '' && this.AT.length > 6) {
        this.dreamFetcher(20, this.AT)
          .then((res) => {
            if (res.status) {
              this.retrievedDreams = res.data.dreamArray
            } else {
              window.location.pathname = 'login'
            }
          })
          .catch((e) => {
            console.log(`oup [${e}]`)
          })
      } else {
        window.location.pathname = 'login'
      }
    } else {
      window.location.pathname = 'login'
    }
  },
  data() {
    return {
      decoIsActive: true,
      username: '--',
      AT: '',
      isInViewAnalyticsMode: false,
      isInViewDreamMode: { status: false, index: 0 },
      retrievedDreams: [],
      data: 'Fetching...',
      decoRate: 900,
      decoColor: '#4200ff',
      dreamObj: {
        longDescription: '',
        contentTags: [],
        properties: {},
        typeTimeline: {},
        references: [],
      },
    }
  },
}
</script>


<template>
  <div id="main">
    <AnalyticsNavBar
      @newDreamSelected="newDreamSelected"
      @createNewDream="createNewDream"
      @onViewAnalytics="onViewAnalytics"
      :isInViewDreamMode="isInViewDreamMode"
      :retrievedDreams="retrievedDreams"
      :un="username"
    ></AnalyticsNavBar>

    <Transition name="tini">
      <div id="main" v-if="isInViewDreamMode.status || !isInViewAnalyticsMode">
        <PropertiesDock
          ref="propertiesDockRef"
          :readOnly="isInViewDreamMode.status"
          :propertiesIn="dreamRetriever().properties"
          @updateDreamObj="descriptionDockOnUpdateDreamObj"
        ></PropertiesDock>
        <DescriptionDock
          @updateDreamObj="descriptionDockOnUpdateDreamObj"
          :readOnly="isInViewDreamMode.status"
          :description="dreamRetriever().longDescription"
        ></DescriptionDock>
        <ContentTagsDock
          :readOnly="isInViewDreamMode.status"
          :contentTagsIn="dreamRetriever().contentTags"
          @updateDreamObj="descriptionDockOnUpdateDreamObj"
        ></ContentTagsDock>
        <TypeTimelineDock
          :typeTimelineStagesIn="
            dreamRetriever().typeTimeline.typeTimelineStages
          "
          :colorSet="dreamRetriever().typeTimeline.colorSet"
          :readOnly="isInViewDreamMode.status"
          @updateDreamObj="descriptionDockOnUpdateDreamObj"
        ></TypeTimelineDock>
        <ReferencesDock
          :readOnly="isInViewDreamMode.status"
          :refsIn="dreamRetriever().references"
          @updateDreamObj="descriptionDockOnUpdateDreamObj"
        ></ReferencesDock>
        <BaseButton
          onClickEventName="onSaveDream"
          @onSaveDream="onSaveDream"
          :HoverColorSet="saveButtonTextController().HoverColorSet"
          id="save_btn"
          width="17.552083333%"
          height="5.277777778%"
          :label="{
            text: saveButtonTextController().label,
            fontSize: saveButtonTextController().fontSize,
          }"
        ></BaseButton>
        <MainSaveButtonDeco
          ref="deco1"
          :rate="decoRate"
          :color="decoColor"
          :isActive="decoIsActive"
          id="save_btn_deco_left"
        ></MainSaveButtonDeco>
        <MainSaveButtonDeco
          ref="deco2"
          :rate="decoRate"
          :color="decoColor"
          :isActive="decoIsActive"
          id="save_btn_deco_right"
        ></MainSaveButtonDeco>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.tini-enter-active,
.tini-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.tini-enter-from,
.tini-leave-to {
  opacity: 0;
}
#save_btn_deco_left {
  top: 92.040741%;
  left: 71.40625%;
  border-right: solid 1px #770aff;
}
#save_btn_deco_right {
  top: 92.040741%;
  left: 94.479166667%;
  border-left: solid 1px #770aff;
}
#save_btn {
  top: 92.040741%;
  left: 76.145833333%;
}
#bkg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #4200ff;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>