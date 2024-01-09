<template>
  <div class="wrap">
    <div class="energy-container">
      <EnergyCard title="用电量统计" unit="kw/h" v-bind="summary"></EnergyCard>
    </div>
    <div class="lineChart">
      <LineChart
        :source="source"
        xAxisName="/时间"
        yAxisName="数值"
        :series="series"
        :color="colors"
        unit="kw/h"
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
import {
  getWaterElectricityChart,
  getWaterElectricitySummary,
  type Summary,
} from "@/api/index";
import { createChartSource } from "@/utils/business";
import EnergyCard from "./EnergyCard.vue";
import { useSettingStore } from "@/stores/setting";
import { useTimeoutPoll } from "@vueuse/core";
const setting = useSettingStore();
const source = ref<(number | string)[][]>([]);

const timeTypeList = [
  { label: "月", value: "3" },
  { label: "近", value: "1" },
] as const;
const activeTimeType = ref<"1" | "3">(timeTypeList[0].value);

async function initChart() {
  try {
    if (!setting.activeFloorId) return;
    const { data } = await getWaterElectricityChart(
      activeTimeType.value,
      "29",
      setting.activeFloorId
    );
    if (!data) return;
    const { dataBody } = data;
    source.value = createChartSource(dataBody);
  } catch (error) {
    console.error(error);
  }
}

const summary = ref<Summary>({
  totalEnergy: 0,
  yoy: 0,
  mom: 0,
});
async function initSummary() {
  try {
    const { data } = await getWaterElectricitySummary(
      activeTimeType.value,
      "29",
      setting.activeFloorId
    );
    summary.value = data;
  } catch (error) {
    console.error(error);
  }
}

function init() {
  if (!setting.activeFloorId) return;
  initChart();
  initSummary();
}

watch(() => setting.activeFloorId, init);
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
</script>

<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";
@import "./common.scss";
</style>
