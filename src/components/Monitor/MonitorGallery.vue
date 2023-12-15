<template>
  <section class="monitor-gallery">
    <!-- <div class="monitor-grid-container" :class="`grid-${gridCount}`">
      <HlsMonitor
        v-for="monitor in monitorList"
        :key="monitor.indexCode"
        class="monitor"
        :src="monitor.videoStreamUrl"
        @dblclick="pickMonitor(monitor)"
      ></HlsMonitor>
    </div> -->
    <template v-if="sourceList.length">
      <Swiper
        class="monitor-grid-container"
        :modules="modules"
        navigation
        :threshold="30"
        style="--swiper-pagination-bottom: -45px"
        @swiper="swiper = $event"
        :pagination="{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet custom-swiper-bullet',
          bulletActiveClass:
            'swiper-pagination-bullet-active custom-swiper-bullet-active',
        }"
      >
        <SwiperSlide
          :class="`grid-${gridCount}`"
          style="padding: 0 4px"
          v-for="(_, groupIdx) in groupCount"
        >
          <div
            ref="playerRefs"
            style="height: 100%; background-color: red"
            v-for="(monitor, idx) in sourceList.slice(
              groupIdx * gridCount,
              (groupIdx + 1) * gridCount
            )"
            :key="groupIdx * gridCount + idx"
            @click.stop="pickMonitor(groupIdx * gridCount + idx)"
          >
            {{ monitor }}
          </div>
        </SwiperSlide>
      </Swiper>
    </template>
    <template v-else>
      <div
        class="monitor-grid-container"
        style="display: flex; justify-content: center; align-items: center"
      >
        <div style="position: relative">
          <img
            style="width: 300px"
            src="../../assets/images/empty.png"
            alt="empty"
          />
          <p
            style="
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              bottom: 42px;
            "
          >
            暂无视频监控
          </p>
        </div>
      </div>
    </template>
    <div class="grid-switch-container">
      <div
        class="switch-btn"
        v-for="gridNum in gridOptions"
        @click="gridCount = gridNum"
        :class="{ 'switch-btn-active': gridCount === gridNum }"
      >
        {{ gridNum }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  onMounted,
  watch,
  nextTick,
  onBeforeUnmount,
} from "vue";
import { useSettingStore } from "@/stores/setting";
import { getMonitorList } from "@/api";
import type { MonitorItem } from "@/api/type";
import HlsMonitor from "./HlsMonitor.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Hammer from "hammerjs";
import { init } from "echarts";
const modules = [Pagination, Navigation];
const swiper = ref<SwiperClass>();
const playerRefs = ref<HTMLElement[]>([]);
const setting = useSettingStore();

const gridOptions = [1, 6];
const gridCount = ref(6);
const activeMonitorIdx = ref<number>(0);
const sourceList = ref<MonitorItem[]>([]);
// const sourceList2 = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const groupCount = computed(() => {
  return Math.ceil(sourceList.value.length / gridCount.value);
});

async function initMonitorList() {
  const regionIndexCode = setting.activeFloorId;
  if (!regionIndexCode) return;
  const { data } = await getMonitorList(regionIndexCode);
  if (!data) return;
  sourceList.value = data.map((item) => item.list || []).flat();
}
watch(() => setting.activeFloorId, initMonitorList, { immediate: true });

async function pickMonitor(idx: number) {
  // if (gridCount.value === 1) {
  //   // activeMonitorIdx.value = undefined;
  //   gridCount.value = 6;
  // } else {
  //   activeMonitorIdx.value = idx;
  //   gridCount.value = 1;
  // }
  console.log("选择监控", idx);
  gridCount.value = gridCount.value === 1 ? 6 : 1;
  const { value: swiperInst } = swiper;
  if (!swiperInst) return;
  await nextTick();
  const slideIdx = Math.ceil((idx + 1) / gridCount.value) - 1;
  swiperInst.slideTo(slideIdx);
}

let hammers: any[] = [];
function initHammers() {
  destroyHammers();
  const { value: players } = playerRefs;
  if (!players) return;
  hammers = players.map((player, idx) => {
    const hammer = new Hammer(player);
    hammer.on("doubletap", (e) => {
      console.log("双击", idx);
      pickMonitor(idx);
    });
    return hammer;
  });
}
function destroyHammers() {
  if (!hammers) return;
  hammers.forEach((hammer) => {
    hammer?.destroy();
    hammer = null;
  });
  hammers = [];
}
// onMounted(initHammers);
// watch(gridCount, () => {
//   console.log("变了", playerRefs.value);
//   initHammers();
// });
// onBeforeUnmount(destroyHammers);
</script>

<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";
// .custom-swiper-slider {
//   height: calc(100% - 50px);
// }
.monitor-gallery {
  position: relative;
  width: 100vw;
  height: 75vh;
}
.monitor-grid-container {
  position: relative;
  width: 100vw;
  height: 70vh;
  overflow: visible;
}
.grid-1 {
  display: grid;
  gap: 4px;
  // .monitor {
  //   width: 100vw;
  //   height: 100%;
  //   object-fit: contain;
  // }
}
.grid-6 {
  //   display: flex;
  //   flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 4px;
  .monitor {
    width: 100%;
    height: 100%;
    // height: 100% !important;
    // object-fit: contain;
  }
}

.grid-switch-container {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  .switch-btn {
    width: 18px;
    height: 18px;
    font-size: 14px;
    text-align: center;
    line-height: 18px;
    border-radius: 4px;
    border: 2px solid #fff;
    opacity: 0.4;
    transition: all 0.15s ease;
    margin-right: 12px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 999;
  }
  .switch-btn-active {
    opacity: 1;
  }
}
</style>
