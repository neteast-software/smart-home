<template>
  <div class="energy-main">
    <EnergyLine></EnergyLine>
    <ElectricityLine></ElectricityLine>
    <WaterLine></WaterLine>
  </div>
</template>

<script setup lang="ts">
import EnergyLine from "./EnergyLine.vue";
import WaterLine from "./WaterLine.vue";
import ElectricityLine from "./ElectricityLine.vue";
</script>
<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";
.energy-main {
  height: 100%;
  width: 100%;
  gap: 20px;
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  // display: flex;
}
</style>
