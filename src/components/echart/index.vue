<template>
  <div class="w-full h-full" ref="chart"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts/core";
import type { ComposeOption } from "echarts/core";
import { LineChart } from "echarts/charts";
import type { LineSeriesOption } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  LegendComponentOption,
  DatasetComponentOption,
} from "echarts/components";
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useResizeObserver, useDebounceFn } from "@vueuse/core";

echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  CanvasRenderer,
  LabelLayout,
  UniversalTransition,
]);
export type ECOption = ComposeOption<
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | DatasetComponentOption
>;
const props = defineProps<{
  option: ECOption;
}>();
const chart = ref<HTMLElement>();
let echartsInstance: echarts.ECharts | null = null; // 用于存储echarts实例
watch(() => props.option, updateChart, { deep: true }); // 监听option变化
function onResize() {
  if (!echartsInstance) return;
  echartsInstance.resize();
} // 监听窗口变化
function destroyChart() {
  echartsInstance?.dispose();
  echartsInstance = null;
} // 销毁图表
function updateChart(option: ECOption) {
  if (!echartsInstance) return;
  echartsInstance.setOption(option, true);
} // 更新图表
function renderChart() {
  echartsInstance = echarts.init(chart.value!);
  updateChart(props.option);
} // 渲染图表
// resize防抖
const resizeDebounce = useDebounceFn(onResize, 50);
useResizeObserver(chart, resizeDebounce);
onMounted(async () => {
  await nextTick();
  renderChart();
});
onBeforeUnmount(() => {
  destroyChart();
});
</script>

<style scoped></style>
