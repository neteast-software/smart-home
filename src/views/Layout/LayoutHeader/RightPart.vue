<script lang="ts" setup>
import { NSelect } from "naive-ui";
import { ref } from "vue";
const areaId = ref(0);
const areaOptions = [
  { label: "办公模式", value: 0 },
  { label: "假日模式", value: 1 },
];
</script>
<template>
  <div class="left-container">
    <div class="value-container">
      <div class="value-contnet">
        <img src="/images/Layout/humidity.svg" alt="" />
        <div>60%</div>
      </div>
      <div class="value-contnet">
        <img src="/images/Layout/temperature.svg" alt="" />
        <div>26°C</div>
      </div>
    </div>
    <div class="NSelect-Container">
      <img class="select-icon" src="/images/Layout/people.svg" alt="" />
      <NSelect
        class=""
        size="large"
        v-model:value="areaId"
        :options="areaOptions"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";
.left-container {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  .value-container {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 22px;
      margin: 0 12px;
    }
    margin-left: 30px;
    // margin-right: 50px;
  }
  .value-contnet {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
  }
  .NSelect-Container {
    position: relative;
    // margin-left: 30px;
    .select-icon {
      pointer-events: none;
      width: 22px;
      height: 22px;
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
    color: $theme-color !important;
  }
}
</style>
