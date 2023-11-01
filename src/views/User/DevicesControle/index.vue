<script setup lang="ts">
import DevicePanel from "@/components/DevicesControle/DevicePanel.vue";
import { NCarousel } from "naive-ui";
import { ref } from "vue";
const devicesList = ref([
  {
    name: "照明",
    id: 1,
    img: "/images/Devices/light.png",
    online: 50,
    total: 120,
  },
  {
    name: "空调",
    id: 1,
    img: "/images/Devices/light.png",
    online: 10,
    total: 20,
  },
  {
    name: "新风",
    id: 1,
    img: "/images/Devices/light.png",
    online: 20,
    total: 30,
  },
  {
    name: "烟感",
    id: 1,
    img: "/images/Devices/light.png",
    online: 120,
    total: 120,
  },
]);
</script>
<template>
  <n-carousel class="carousel-container" draggable :slides-per-view="1">
    <DevicePanel :devicesList="devicesList" />
    <DevicePanel :devicesList="devicesList" />
    <DevicePanel :devicesList="devicesList" />
  </n-carousel>
</template>
<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";
.carousel-container {
  width: 100vw;
  height: 75vh;
}
</style>
