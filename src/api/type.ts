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
