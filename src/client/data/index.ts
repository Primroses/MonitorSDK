// 构建上报数据的基础原型
class Data {
  userId: string; // 用户的唯一标识

  trackId: string; // 错误发生过后的唯一标识该错误的Id

  timeStamp: string; // 当前发生错误时间的时间撮

  // 需要两个类型进行 定位索引?
  mainType: MainDataType; // 上报数据的类型(主要的)

  // private minorType:MinorDataType; // 次要类型

  device: DeviceInfo; // 操作硬件的信息

  currentUrl: string; // 当前所处的Url

  refererUrl: string; // 是从什么来源 到什么来源的

  pageInfo: PageInfo; // 当前页面的信息
  // 各类数据类型
  appVersion: number;

  apiVersion: number;

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
  }
}
