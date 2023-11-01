export interface MonitorListItem {
  id: number;
  name: string;
  online: 0 | 1;
  picUrl: string;
  indexCode: string;
  regionName: string;
}
export interface MonitorItem {
  id: number;
  indexCode: string;
  regionName: string;
  regionPathName: string;
  url: string;
}
export interface MonitorRegionOption {
  rigionName: string;
  rigionType: string;
  rigionIndexCode: string;
  parentIndexCode: string;
  childrenList: MonitorRegionOption[];
}
