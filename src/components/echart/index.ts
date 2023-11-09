import { LineSeriesOption } from "echarts/charts";
export type DatasetSource = (string | number)[][];
export interface BaseChartProps {
    xAxisName?: string;
    yAxisName?: string;
    source: DatasetSource;
}
export const lineDefaultSeries: LineSeriesOption = {
    type: "line",
    seriesLayoutBy: "row",
    smooth: true,
    showSymbol: false,
    lineStyle: {
      width: 3,
      cap: "round",
    },
  };