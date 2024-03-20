import { AirConditionerMode, FeatureType } from "@/enums";

export interface AreaTreeNode {
  id: number;
  regionName: string;
  regionIndexCode: string;
  type: "location" | "area" | "floor" | "room";
  childrenList: AreaTreeNode[] | null;
}
export interface MonitorItem {
  id: number;
  name: string;
  indexCode: string;
  regionName: string;
  videoStreamUrl: string;
}

export interface AirConditionerStatus {
  id: number;
  device_id: number;
  wind_speed: number;
  fault_status: number;
  mode: AirConditionerMode;
  state: boolean;
  running: boolean;
  temperature: number;
  online: boolean;
  is_master: boolean;
  name: string;
}
export interface LightingStatus {
  id: number;
  device_id: number;
  state: boolean;
  running: boolean;
  name: string;
  online: boolean;
}

export interface DeviceBaseFeature {
  name: string;
  alias_name: string;
  feature_id: FeatureType;
  feature_type: string;
  param: any;
}
export interface DeviceStepFeature extends DeviceBaseFeature {
  feature_id: 4;
  param: {
    max: number;
    min: number;
    recommend_max: number;
    recommend_min: number;
    step: number;
  };
}
export interface DeviceLinearFeature extends DeviceBaseFeature {
  feature_id: 5;
  param: {
    max: number;
    min: number;
    recommend_max: number;
    recommend_min: number;
    unit: number;
  };
}
export interface DeviceOptionFeature extends DeviceBaseFeature {
  feature_id: 3;
  param: {
    index: number;
    name: string;
    value: number;
  }[];
}
[];
export type DeviceFeature =
  | DeviceBaseFeature
  | DeviceStepFeature
  | DeviceLinearFeature
  | DeviceOptionFeature;

export interface getDeviceDetailResult {
  AirConditioner: {
    list: AirConditionerStatus[];
    feature: DeviceFeature[];
  };
  Lighting: {
    list: LightingStatus[];
    feature: DeviceFeature[];
  };
}
