<script setup lang="ts">
import LayoutHeader from "./LayoutHeader/index.vue";
import LayoutMain from "./LayoutMain.vue";
import LayoutBottom from "./LayoutBottom.vue";
import { NConfigProvider, darkTheme } from "naive-ui";
</script>
<template>
  <NConfigProvider :theme="darkTheme">
    <div class="layout-container">
      <LayoutHeader class="layout-header" />
      <LayoutMain class="layout-main" />
      <LayoutBottom class="layout-bottom" />
    </div>
  </NConfigProvider>
</template>
<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";
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
  margin-bottom: 30px;
}
.layout-main {
  width: 100vw;
  height: 74vh;
  overflow: hidden;
}
</style>
