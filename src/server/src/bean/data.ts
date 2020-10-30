export default class Data {
  userId: string; // 用户的唯一标识
  trackId: string; // 错误发生过后的唯一标识该错误的Id
  timeStamp?: string; // 当前发生错误时间的时间撮
  // 需要两个类型进行 定位索引?
  mainType?: "ERROR" | "PROMISE" | "RESOURCE" | "EVENTLISTENER" | "CONSOLE"; // 上报数据的类型(主要的)
  // private minorType:MinorDataType; // 次要类型
  ua: string;
  type: string;
  os: string; // 操作硬件的信息
  currentUrl?: string; // 当前所处的Url
  refererUrl?: string; // 是从什么来源 到什么来源的
  pageHeight: number;
  pageWidth: number;
  screenHeight: number;
  screenWidth: number; // 当前页面的信息
  // 各类数据类型
  appVersion: number;
  apiVersion: number;
  appId: number;
  data: any;
  tableName: string;
  constructor(options: Data) {
    this.userId = options.userId;
    this.trackId = options.trackId;
    this.timeStamp = options.timeStamp;
    this.mainType = options.mainType;
    this.ua = options.ua;
    this.type = options.type;
    this.os = options.os;
    this.currentUrl = options.currentUrl;
    this.refererUrl = options.refererUrl;
    this.pageHeight = options.pageHeight;
    this.pageWidth = options.pageWidth;
    this.screenHeight = options.screenHeight;
    this.appVersion = options.appVersion;
    this.appId = options.appId;
    this.apiVersion = options.apiVersion;
    this.data = options.data;
    this.tableName = options.tableName;
  }
}
