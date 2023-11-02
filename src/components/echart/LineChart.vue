<template>
  <div class="chart">
    <chart :option="option" class="chart"></chart>
  </div>
</template>

<script setup lang="ts">
import chart from "./index.vue";
import type { ECOption } from "./index.vue";
import { LineSeriesOption } from "echarts/charts";
import { BaseChartProps, lineDefaultSeries } from "./index";
import { computed } from "vue";
import {
  LegendComponentOption,
  TooltipComponentOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from "echarts";
interface Props extends BaseChartProps {
  color?: string[] | string;
  series?: LineSeriesOption | LineSeriesOption[];
}
const props = withDefaults(defineProps<Props>(), {});
const defaultXAxis: XAXisComponentOption = {
  type: "category",
  axisLine: {
    show: false,
  },
  axisTick: {
    show: false,
  },
  axisLabel: {
    fontSize: 12,
  },
  nameTextStyle: {
    fontSize: 8,
    padding: [0, 0, -20, -25],
    verticalAlign: "bottom",
    color: "#838EB6",
  },
};
const defaultYAxis: YAXisComponentOption = {
  type: "value",
  axisLabel: {
    fontSize: 12,
    align: "center",
    // padding: [0, 30, 0, 0],
  },
  nameTextStyle: {
    fontSize: 8,
    padding: [0, 20, 0, 0],
    color: "#838EB6",
  },
  splitLine: {
    lineStyle: {
      color: ["rgba(85, 110, 153, 0.08)"],
      width: 0.5,
    },
  },
};
const defaultLegend: LegendComponentOption = {
  icon: "rect",
  top: 0,
  left: 40,
  borderRadius: 2,
  itemGap: 40,
  itemWidth: 8,
  itemHeight: 8,
  textStyle: {
    fontSize: 10,
    color: "#ffffff",
  },
};
const defaultTooltip = computed<TooltipComponentOption>(() => {
  return {
    show: true,
    trigger: "axis",
  };
});

const option = computed<ECOption>(() => {
  const { xAxisName, yAxisName, source, series, color } = props;
  console.log(source);

  if (source.length < 1) return {};
  const finalSeries = series
    ? Array.isArray(series)
      ? series
      : { ...lineDefaultSeries, ...series }
    : lineDefaultSeries;
  return {
    xAxis: {
      ...defaultXAxis,
      name: xAxisName,
    },
    yAxis: {
      ...defaultYAxis,
      name: yAxisName,
    },
    dataset: {
      source,
    },
    series: Array.isArray(finalSeries)
      ? finalSeries
      : new Array(source.length - 1).fill(finalSeries),
    legend: {
      ...defaultLegend,
    },
    grid: {
      top: "20%",
      bottom: "20%",
      left: 30,
      right: 30,
    },
    tooltip: {
      ...defaultTooltip.value,
    },
    color,
  };
});
</script>

<style lang="scss" scoped>
@import "@/styles/globalStyles.scss";

.chart {
  width: 100%;
  height: 100%;
}
</style>
