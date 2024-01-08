<template>
  <div class="wrap">
    <div class="energy-container">
      <EnergyCard
        title="综合能耗"
        unit="Kgce"
        :yoy="summary.yoy"
        :mom="summary.mom"
        :total-energy="summary.buildingComprehensiveEnergy"
      >
        <div>
          碳排<span
            :style="{
              textShadow: 'none',
              marginLeft: '16px',
              color: summary.carbonEmission >= 0 ? '#4DC591' : '#FF7648',
            }"
            >{{ summary.carbonEmission >= 0 ? "+" : "" }}
            {{ summary.carbonEmission?.toFixed(2) }} kg</span
          >
        </div>
      </EnergyCard>
    </div>
    <div class="lineChart">
      <LineChart
        :source="source"
        xAxisName="/时间"
        yAxisName="数值"
        :series="series"
        :color="colors"
        unit="km³"
      ></LineChart>
      <div class="button">
        <div
          v-for="item in timeTypeList"
          @click="
            activeTimeType = item.value;
            init();
          "
          :class="{
            active: activeTimeType === item.value,
          }"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, unref, watch } from "vue";
import LineChart from "@/components/echart/LineChart.vue";
import * as echarts from "echarts/core";
import { hexToRgba } from "@/components/echart/color";
import { lineDefaultSeries } from "@/components/echart/index";
import { LineSeriesOption } from "echarts/charts";
import { getEnergyChart, getEnergySummary, type Summary } from "@/api/index";
import { createChartSource } from "@/utils/business";
import EnergyCard from "./EnergyCard.vue";
import { useSettingStore } from "@/stores/setting";
import { useTimeoutPoll } from "@vueuse/core";
import {} from "@ionic/vue";
const settting = useSettingStore();
const source = ref<(number | string)[][]>([]);

const timeTypeList = [{ label: "月", value: "3" }] as const;
const activeTimeType = ref<"1" | "3">(timeTypeList[0].value);

async function initChart() {
  const { data } = await getEnergyChart();
  if (!data) return;
  const { dataBody } = data;
  source.value = createChartSource(dataBody);
  console.log("接口上岛咖啡", data);
  // source.value = res.data;
}

const summary = ref<Summary>({
  yoy: 0,
  mom: 0,
  buildingComprehensiveEnergy: 0,
  carbonEmission: 0,
});
async function initSummary() {
  const { data } = await getEnergySummary();
  console.log("综合能耗概要", data);
  summary.value = data;
}
function init() {
  if (!settting.activeFloorId) return;
  initChart();
  initSummary();
}
watch(() => settting.activeFloorId, init);
const { resume } = useTimeoutPoll(init, 10000);
onMounted(resume);

const colors = ["#4DC591", "#FF7648"];
const series = computed<LineSeriesOption[]>(() => {
  const len = unref(source).length - 1;
  return unref(colors)
    .slice(0, len)
    .map((hexColor) => {
      return {
        ...lineDefaultSeries,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: hexToRgba(hexColor, 80),
            },
            {
              offset: 1,
              color: hexToRgba(hexColor, 0),
            },
          ]),
        },
      };
    });
});
const data = {
  title: "用电量统计",
  total: 1038,
  unit: "kw/h",
  YOY: +0.035,
  QOQ: -0.023,
};
</script>

<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";
@import "./common.scss";
</style>
