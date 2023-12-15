import http from "@/utils/http";
import type { AreaTreeNode, MonitorItem } from "./type";

// 获取区域树
export const getAreaTree = async () => {
  const { data } = await http.get<{ data: AreaTreeNode[] }>(
    "/video/screen/getRegionSelectList"
  );
  return data.value!;
};

// 获取监控列表
export const getMonitorList = async (regionIndexCode: string) => {
  const { data } = await http.get<{
    data: { name: string; list: MonitorItem[] | null }[];
  }>("/video/screen/getVideoList", {
    regionIndexCode,
  });
  return data.value!;
};
