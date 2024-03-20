<script lang="ts" setup>
import { NSelect } from "naive-ui";
import { computed, ref } from "vue";
import {
  useNow,
  useDebounceFn,
  useThrottleFn,
  useFullscreen,
} from "@vueuse/core";
import { format } from "date-fns";
import AreaOptionsPanel from "@/components/Layout/AreaOptionsPanel.vue";
import { App } from "@capacitor/app";
import { useSettingStore } from "@/stores/setting";
import storage from "@/utils/storage";
const setting = useSettingStore();
const areaOptionsPanelRef = ref<InstanceType<typeof AreaOptionsPanel>>();
const now = useNow();
const defaultAreaOption = { label: "总览", value: "" };
const areaOptions = ref([defaultAreaOption]);

const { toggle } = useFullscreen();
let exitFlag = 0;
const exitFlagLimit = 5;
const resetExitFlag = useDebounceFn(() => {
  exitFlag = 0;
}, 800);
const exitApp = useThrottleFn(() => {
  App?.exitApp()
    .then(() => {
      storage.clear();
    })
    .catch(toggle);
}, 1000);

function tryExit() {
  if (exitFlag >= exitFlagLimit) {
    exitApp();
    return;
  }
  exitFlag++;
  resetExitFlag();
}

function onPickFloor(id: string, name: string) {
  areaOptions.value = [defaultAreaOption, { label: name, value: id }];
}

const logo = ref<HTMLElement>();
// const showLogo = computed
</script>
<template>
  <div class="left-container">
    <!-- <img src="@images/Layout/Logo.svg" @click="tryExit" alt="Logo" /> -->
    <div id="logo" ref="logo">
      <img src="@images/Layout/Logo.svg" @click="tryExit" alt="Logo" />
    </div>
    <div class="NSelect-Container">
      <img class="select-icon" src="@images/Layout/location.svg" alt="" />
      <NSelect
        class="NSelect"
        :value="setting.activeFloorId"
        size="large"
        disabled
        @click="areaOptionsPanelRef!.toggleOptionsPanel()"
        :options="areaOptions"
      />
      <AreaOptionsPanel ref="areaOptionsPanelRef" @pick="onPickFloor" />
    </div>
    <div class="current-time-container">
      <!-- <img src="@images/Layout/time.svg" alt="time" /> -->
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
  z-index: 2;
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
