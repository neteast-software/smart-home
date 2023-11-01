<script lang="ts" setup>
import { NSelect } from "naive-ui";
import { ref } from "vue";
import { useNow } from "@vueuse/core";
import { format } from "date-fns";
const now = useNow();
const areaId = ref(0);
const areaOptions = [
  { label: "南1楼", value: 0 },
  { label: "南2楼", value: 1 },
  { label: "南3楼", value: 2 },
  { label: "南4楼", value: 3 },
];
const isFullScreen = ref(false);
const toggleFullScreen = () => {
  isFullScreen.value = !isFullScreen.value;
  if (isFullScreen.value) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
</script>
<template>
  <div class="left-container">
    <img src="/images/Layout/Logo.svg" @click="toggleFullScreen" alt="Logo" />
    <div class="NSelect-Container">
      <img class="select-icon" src="/images/Layout/location.svg" alt="" />
      <NSelect
        class="NSelect"
        v-model:value="areaId"
        size="large"
        :options="areaOptions"
      />
    </div>
    <div class="current-time-container">
      <!-- <img src="/images/Layout/time.svg" alt="time" /> -->
      <span class="current-time">{{ format(now, "MM月dd日") }}</span>
      {{ format(now, "HH:mm:ss") }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";
.left-container {
  display: flex;
  flex-grow: 1;
  .NSelect-Container {
    position: relative;
    margin-left: 30px;
    .NSelect {
      width: 160px;
    }
    .select-icon {
      pointer-events: none;
      width: 24px;
      height: 24px;
      position: absolute;
      top: 50%;
      transform: translate(12px, -50%);
      z-index: 1;
    }
  }
  ::v-deep(.n-base-selection-label) {
    background-color: $theme-card !important;
    padding-left: 32px;
    padding-right: 24px;
  }
  ::v-deep(.n-base-selection-label::before) {
    // content: "test";
    position: absolute;
    left: 15px;
  }
  ::v-deep(.n-base-selection-input) {
    color: $theme-primary !important;
  }
  .current-time-container {
    display: flex;
    align-items: center;
    margin-left: 30px;
    width: 170px;
    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    span {
      margin-right: 10px;
    }
    .current-time {
      width: 75px;
    }
  }
}
</style>
