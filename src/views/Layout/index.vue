<script setup lang="ts">
import LayoutHeader from "./LayoutHeader/index.vue";
import LayoutMain from "./LayoutMain.vue";
import LayoutBottom from "./LayoutBottom.vue";
import ConfirmDialog from "@/components/Dialog/ConfirmDialog.vue";
import { useDialogManagerStore } from "@/stores/dialogManager";
import { storeToRefs } from "pinia";
import { NConfigProvider, darkTheme } from "naive-ui";
const dialogManager = useDialogManagerStore();
const { dialogContainerRef, showDialog } = storeToRefs(dialogManager);
const { handleCloseDialog } = dialogManager;
// const window2 = window;
// {{ window2.screen.width }}
// {{ window2.screen.height }}
</script>
<template>
  <NConfigProvider :theme="darkTheme">
    <div
      class="dialog-container"
      :class="{ 'show-dialog': showDialog }"
      ref="dialogContainerRef"
    >
      <ConfirmDialog class="confirm-dialog-container" />
      <div class="dialog-bg" @click="handleCloseDialog"></div>
    </div>
    <div class="layout-container">
      <LayoutHeader class="layout-header" />
      <LayoutMain class="layout-main" />
      <LayoutBottom class="layout-bottom" />
    </div>
  </NConfigProvider>
</template>
<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";
.dialog-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  pointer-events: none;
  opacity: 0;
  transition: all 0.15s ease;
  .dialog-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0.85;
    background-color: $theme-bg;
    z-index: -1;
  }
}
.confirm-dialog-container {
  transition: all 0.15s ease;
  transform-origin: center;
  transform: translate(-50%, -50%) scale(0.6);
}
.show-dialog {
  opacity: 1;
  pointer-events: auto !important;
  .confirm-dialog-container {
    transform: translate(-50%, -50%) scale(1);
  }
}
.layout-container {
  position: relative;
  max-width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
.layout-header {
  margin-bottom: 20px;
}
.layout-main {
  width: 100vw;
  height: 75vh;
  overflow: hidden;
}
</style>
