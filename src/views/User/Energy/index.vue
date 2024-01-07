<template>
  <div class="energy-main">
    <EnergyLine></EnergyLine>
    <ElectricityLine></ElectricityLine>
    <WaterLine></WaterLine>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import EnergyCard from "./EnergyCard.vue";
import EnergyLine from "./EnergyLine.vue";
import WaterLine from "./WaterLine.vue";
import ElectricityLine from "./ElectricityLine.vue";
import { getWaterElectricityChart } from "@/api/index";

const energyList1 = ref({
  title: "综合能耗",
  total: 1038,
  unit: "kgce",
  YOY: -0.023,
  QOQ: +0.035,
  data: {
    name: "碳排",
    num: +3032,
  },
});
// { name: "碳排", num: +3032, unit: "kg" },
const energyList2 = ref({
  title: "用电量统计",
  total: 1038,
  unit: "kw/h",
  YOY: +0.035,
  QOQ: -0.023,
});
const energyList3 = ref({
  title: "用水量统计",
  total: 1038,
  unit: "km³",
  YOY: +0.035,
  QOQ: +0.014,
});
const source = ref<(number | string)[][]>([]);
onMounted(() => {
  setTimeout(() => {
    source.value = [
      [
        "product",
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      ["南楼", 3.5, 2.1, 1.9, 2, 2.3, 2, 1.5, 3.5, 3, 2.3, 2.8, 3.7],
      ["北楼", 1.8, 1.3, 2, 3.2, 3.3, 2.7, 3.5, 4.5, 3.6, 3.3, 4, 3.2],
    ];
  }, 500);
});
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
// .energy-container {
//   width: 30%;
//   padding-left: 40px;
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
//   margin-right: 25px;
// }
// .energy-lineChart {
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
//   flex: 1 1 0%;
//   width: 0;
//   margin-right: 45px;
// }
</style>
