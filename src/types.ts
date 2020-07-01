export interface User {
  userId: string | number;
  userName: string;
}
export interface UpLoadData {
  [key: string]: any;
}

export interface DeviceInfo {
  browser: {
    type: string;
    UA: string;
  };
  os: string;
}

export interface PerformanceOptions {
  loadPageTime: number;
  domReady: number;
  redirect: number;
  lookupDomain: number;
  TTFB: number;
  contentReady: number;
  connect: number;
  url:string;
}

export interface ResourceOptions{
  resourceName:string;
  redirect:number;
  request:number;
  duration:number;
  connect:number;
}

// 上报的数据类型
export type DataType = "ERROR" | "PROMISE" | "AJAX" | "RESOURCE" | "TRACK" | "EVENT" | "PERFORMANCE";

// History的方法
export type HistoryFun = "pushState" | "replaceState";

export type AdaptorType = "ERROR" | "TRACK" | "PERFORMANCE" | "RESOURCE"; // 错误还是 路径 性能类型

