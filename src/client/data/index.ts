// 构建上报数据的基础原型
export class Data {
  userId?: string; // 用户的唯一标识

  trackId?: string; // 错误发生过后的唯一标识该错误的Id

  timeStamp?: string | number; // 当前发生错误时间的时间撮

  // 需要两个类型进行 定位索引?
  mainType?: MainDataType; // 上报数据的类型(主要的)

  // private minorType:MinorDataType; // 次要类型

  device?: DeviceInfo; // 操作硬件的信息

  currentUrl?: string; // 当前所处的Url

  refererUrl?: string; // 是从什么来源 到什么来源的
  data?: string;
  pageInfo?: PageInfo; // 当前页面的信息
  // 各类数据类型
  appVersion?: number;

  apiVersion?: number;

  appId?: number;

  constructor(options: Data) {
    this.userId = options.userId;
    this.trackId = options.trackId;
    this.timeStamp = options.timeStamp;
    this.mainType = options.mainType;
    this.device = options.device;
    this.currentUrl = options.currentUrl;
    this.refererUrl = options.refererUrl;
    this.pageInfo = options.pageInfo;
    this.appVersion = options.appVersion;
    this.apiVersion = options.apiVersion;
    this.appId = options.appId;
    this.data = options.data;
  }
}

interface TimesData {
  loadPageTime: number;
  domReady: number;
  redirect: number;
  lookupDomain: number;
  TTFB: number;
  contentReady: number;
  connect: number;
}

interface TimesResource {
  name: string;
  duration: number;
  request: number;
  redirect: number;
  connect: number;
}

interface MemoryInfo {
  jsHeapSizeLimit: number;
  totalJSHeapSize: number;
  usedJSHeapSize: number;
}
//         options.resourceName = val.name.substr(val.name.lastIndexOf("/") + 1); // 资源名字
//         options.duration = val.duration; // 加载时间
//         options.request = val.responseEnd - val.requestStart; // 资源加载时间
//         options.redirect = val.redirectEnd - val.redirectStart; // 重定向时间
//         options.connect = val.connectEnd - val.connectStart; // TCP链接的时间

export class PerformanceData extends Data {
  navigation: PerformanceNavigation;
  timesData: TimesData;
  timesResource: TimesResource;
  memoryInfo?: MemoryInfo;
  constructor(options: PerformanceData) {
    super(options);
    this.navigation = options.navigation;
    this.timesData = options.timesData;
    this.timesResource = options.timesResource;
    this.memoryInfo = options.memoryInfo;
  }
}
