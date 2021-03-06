/// <reference path="./node_modules/@types/jest/index.d.ts" />

// declare global {
//   interface Window {
//     requestIdleCallback: (callBack: Function) => void;
//   }
// }

interface User {
  userId: string | number;
  userName: string;
}
// interface UpLoadData {
//   [key: string]: any;
// }

interface DeviceInfo {
  browser: {
    type: string;
    ua: string;
  };
  os: string;
}

interface PageInfo {
  pageWidth: number;
  pageHeight: number;
  screenWidth: number;
  screenHeight: number;
}

// interface PerformanceOptions {
//   loadPageTime: number;
//   domReady: number;
//   redirect: number;
//   lookupDomain: number;
//   TTFB: number;
//   contentReady: number;
//   connect: number;
//   url: string;
// }

// interface ResourceOptions {
//   resourceName: string;
//   redirect: number;
//   request: number;
//   duration: number;
//   connect: number;
// }

// 上报的数据类型
// type DataType = "ERROR" | "PROMISE" | "AJAX" | "RESOURCE" | "TRACK" | "EVENT" | "PERFORMANCE";

type MainDataType =
  | "ERROR"
  | "PROMISE"
  | "AJAX"
  | "RESOURCE"
  | "TRACK"
  | "EVENT"
  | "PERFORMANCE"
  | "EVENTLISTENER"
  | "CONSOLE"
  | "REQUEST";

type TableName = "error" | "track" | "performance";

// History的方法
// type HistoryFun = "pushState" | "replaceState";

// type AdaptorType = "ERROR" | "TRACK" | "PERFORMANCE" | "RESOURCE"; // 错误还是 路径 性能类型

type OperatorType = "add" | "clear" | "read";

interface sendData {
  saveType: "store" | "indexDB";
  data: {
    [key: string]: any;
  };
}

type SaveType = "store" | "indexDB";
