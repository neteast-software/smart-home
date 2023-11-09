<template>
  <div class="lineChart">
    <LineChart
      :source="source"
      xAxisName="/时间"
      yAxisName="数值"
      :series="series"
      :color="colors"
      :unit="unit"
    ></LineChart>
    <div class="button">
      <div
        v-for="(item, idx) in dateList"
        @click="changeActive(idx)"
        :class="{
          active: select === idx,
        }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, unref } from "vue";
import LineChart from "@/components/echart/LineChart.vue";
import * as echarts from "echarts/core";
import { hexToRgba } from "@/components/echart/color";
import { lineDefaultSeries } from "@/components/echart/index";
import { LineSeriesOption } from "echarts/charts";
interface Props {
  source: (string | number)[][];
  unit?: string;
}
const props = withDefaults(defineProps<Props>(), {});

const colors = ["#4DC591", "#FF7648"];
const series = computed<LineSeriesOption[]>(() => {
  const { source } = props;
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
const select = ref(0);
const dateList = ref(["月", "近"]);
const changeActive = (idx: any) => {
  select.value = idx;
};
</script>

<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";

.lineChart {
  display: flex;
  height: 34%;
  .button {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 10px;
    div {
      padding: 8px;
      padding-left: 11px;
      padding-right: 11px;
      border-radius: 8px;
      font-size: 14px;
      background: #232d42;
      border-image: linear-gradient(179deg, #212f43 -35%, rgba(0, 0, 0, 0) 99%);
    }
  }
}

.active {
  background: $theme-primary !important;
}
</style>
