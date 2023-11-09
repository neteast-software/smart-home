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
import { computed, reactive } from "vue";
import {
  LegendComponentOption,
  TooltipComponentOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from "echarts";
interface Props extends BaseChartProps {
  color?: string[] | string;
  series?: LineSeriesOption | LineSeriesOption[];
  unit?: string;
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
    padding: [0, 0, -20, -15],
    verticalAlign: "bottom",
    color: "#8A92A6",
  },
};
const defaultYAxis = reactive<YAXisComponentOption>({
  type: "value",
  axisLabel: {
    fontSize: 12,
    align: "center",
    formatter: (value: number) => {
      if (value === 0 || !props.unit) {
        return value.toString();
      }
      return `${value}${props.unit}`;
    },
  },
  nameTextStyle: {
    fontSize: 8,
    padding: [0, 10, 0, 0],
    color: "#8A92A6",
  },
  splitLine: {
    lineStyle: {
      width: 0,
    },
  },
});
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
    position: function (point, params, dom, rect, size) {
      // 固定在顶部
      return [point[0], "10%"];
    },
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
