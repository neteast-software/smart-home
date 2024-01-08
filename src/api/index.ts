import http from "@/utils/http";
import type { AreaTreeNode, MonitorItem } from "./type";

// 登录
export const login = async (username: string, password: string) => {
  const { data } = await http.post<{ data: { access_token: string } }>(
    "/auth/login",
    { username, password }
  );
  return data.value!;
};

// 获取用户信息
export const getUserInfo = async () => {
  const { data } = await http.get<{ data: { nickName: string } }>(
    "/system/user/getInfo"
  );
  return data.value!;
};

// 获取区域树
export const getAreaTree = async () => {
  const { data } = await http.get<{ data: AreaTreeNode[] }>(
    "/cii/screen/getRegionSelectList"
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

// 获取水电用量
export const getWaterElectricityChart = async (
  timeType: "1" | "2" | "3" | "4" | "5" = "1",
  energyType: "29" | "30" = "29",
  regionId: number | string
) => {
  const { data } = await http.get("/cii/screen/areaLineByFloor", {
    timeType,
    energyType,
    regionId,
  });
  return data.value!;
};

export interface Summary {
  mom?: number;
  yoy?: number;
  totalEnergy?: number;
  [key: string]: any;
}
// 获取水电统计概要
export const getWaterElectricitySummary = async (
  timeType: "1" | "2" | "3" | "4" | "5" = "1",
  energyType: "29" | "30" = "29",
  regionId: number | string
) => {
  const { data } = await http.get<{ data: Summary }>(
    "/cii/screen/areaTotalByFloor",
    {
      timeType,
      energyType,
      regionId,
    }
  );
  return data.value!;
};

// 获取温湿度
export const getTemperatureHumidity = async (id: number) => {
  const { data } = await http.get(`/device/overview/environment/${id}`);
  return data.value!;
};

// 获取综合能耗概要
export const getEnergySummary = async () => {
  const { data } = await http.get<{ data: Summary }>(
    "/cii/screen/getCecDetail"
  );
  return data.value!;
};

// 获取综合能耗图表
export const getEnergyChart = async () => {
  const { data } = await http.get("/cii/screen/cecLineByFloor");
  return data.value!;
};

// 批量控制开关
export const batchControlSwitch = async (
  all_of_area_id: number | string,
  device_type: string,
  open: boolean
) => {
  const { data } = await http.put("/device/control/batch_switch", {
    all_of_area_id: Number(all_of_area_id),
    device_type,
    open,
  });
  return data.value!;
};

// 批量获取设备在线数量
export const getDeviceOnlineCount = async (
  type: string,
  area_id: number | string
) => {
  const { data } = await http.get<{ data: { name: string; value: number }[] }>(
    "/device/analysis/count/online",
    {
      type,
      area_id: area_id && Number(area_id),
    }
  );
  return data.value!;
};

// 获取设备类型列表
export const getDeviceTypeList = async () => {
  const { data } = await http.get<{ data: { name: string; value: string }[] }>(
    "/device/types"
  );
  return data.value!;
};
