interface ChartData {
  title: string;
  abscissa: string[];
  dataList: { name: string; value: number[] | number }[];
}
export function createChartSource(
  data: ChartData,
  xName?: string,
  yName?: string,
  reverse = false
) {
  const title = data?.title || "";
  const xAxis = data?.abscissa || [];
  const dataList = data?.dataList || [];
  const items = dataList.map((item) =>
    Array.isArray(item.value)
      ? [item.name, ...item.value]
      : [item.name, item.value]
  );
  let source = [[xName || title, ...xAxis], ...items];
  console.log("进到这里来", xName, yName);
  //   if (!xAxis.length) {
  //     const names = reverse
  //       ? dataList.map((item) => item.name).reverse()
  //       : dataList.map((item) => item.name);
  //     const values = reverse
  //       ? dataList.map((item) => item.value).reverse()
  //       : dataList.map((item) => item.value);
  //     source = [
  //       [xName || title, ...names],
  //       [yName || "数量", ...(values as number[])],
  //     ];
  //   }

  return source;
}
