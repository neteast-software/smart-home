<script setup lang="ts">
import DevicePanel from "@/components/DevicesControle/DevicePanel.vue";
import { NCarousel } from "naive-ui";
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const modules = [Pagination, Navigation];

const devicesList = ref([
  {
    name: "照明",
    id: 1,
    img: new URL("@images/Devices/light.png", import.meta.url).href,
    online: 50,
    total: 120,
  },
  {
    name: "监控",
    id: 1,
    img: new URL("@images/Devices/Monitor-4x.png", import.meta.url).href,
    online: 10,
    total: 20,
  },
  {
    name: "新风",
    id: 1,
    img: new URL("@images/Devices/Fresh_Air-4x.png", import.meta.url).href,
    online: 20,
    total: 30,
  },
  {
    name: "烟感",
    id: 1,
    img: new URL("@images/Devices/Smoke_Sensor.png", import.meta.url).href,
    online: 120,
    total: 120,
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
      bulletActiveClass: 'swiper-pagination-bullet-active custom-swiper-bullet-active'
    }"
  >
    <SwiperSlide v-for="item in 3" :key="item">
      <DevicePanel :devicesList="devicesList" />
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
