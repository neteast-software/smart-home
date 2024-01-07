<script setup lang="ts">
import DevicePanelList from "@/components/DevicesControle/DevicePanelList.vue";
import { NCarousel } from "naive-ui";
import { computed, onMounted, ref, provide } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  batchGetDeviceOnlineCount,
  getDeviceTypeList,
  type DeviceOnlineCountMap,
} from "@/api";
import { useTimeoutPoll } from "@vueuse/core";

const countsMap = ref<DeviceOnlineCountMap>({});
async function initCounts() {
  const { data } = await batchGetDeviceOnlineCount([
    "Lighting",
    "AirConditioner",
    "SmartWaterMeter",
    "SmartElectricMeter",
  ]);
  countsMap.value = data;
  console.log("data", data);
}
const typeList = ref<{ name: string; value: string }[]>([]);
// async function initTypeList() {
//   const { data } = await getDeviceTypeList();
//   typeList.value = data;
// }
// provide("typeList", typeList);

function init() {
  initCounts();
  // initTypeList();
}
const { resume } = useTimeoutPoll(init, 10000);
onMounted(resume);
const modules = [Pagination, Navigation];

const devicesList = computed(() => [
  {
    label: "照明",
    name: "Lighting",
    counts: countsMap.value["Lighting"],
    id: 1,
    swich: true,
    img: new URL("@images/Devices/light.png", import.meta.url).href,
  },
  {
    label: "空调",
    name: "AirConditioner",
    counts: countsMap.value["AirConditioner"],
    id: 1,
    swich: true,
    img: new URL("@images/Devices/Monitor-4x.png", import.meta.url).href,
  },
  {
    label: "水表",
    name: "SmartWaterMeter",
    counts: countsMap.value["SmartWaterMeter"],
    id: 1,
    img: new URL("@images/Devices/SmartWaterMeter.png", import.meta.url).href,
  },
  {
    label: "电表",
    name: "SmartElectricMeter",
    counts: countsMap.value["SmartElectricMeter"],
    id: 1,
    img: new URL("@images/Devices/SmartElectricMeter.png", import.meta.url)
      .href,
  },
]);
</script>
<template>
  <Swiper
    class="carousel-container"
    :modules="modules"
    :slides-per-view="1"
    :threshold="30"
    navigation
    :pagination="{
      clickable: true,
      bulletClass: 'swiper-pagination-bullet custom-swiper-bullet',
      bulletActiveClass:
        'swiper-pagination-bullet-active custom-swiper-bullet-active',
    }"
  >
    <SwiperSlide v-for="item in 1" :key="item">
      <DevicePanelList :devicesList="devicesList" />
    </SwiperSlide>
  </Swiper>
  <!-- <NCarousel class="carousel-container" draggable :slides-per-view="1">
    <DevicePanel :devicesList="devicesList" />
    <DevicePanel :devicesList="devicesList" />
    <DevicePanel :devicesList="devicesList" />
  </NCarousel> -->
</template>
<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";
</style>
