// // 定制化的用户信息
// import { getBrowserInfo, getOSInfo } from "./utils";
// // 上报的基础数据
// export class Data {
//   private type: string;
//   private userInfo: Partial<User>;
//   private data: UpLoadData;
//   private info: DeviceInfo;
//   private time: string;
//   private appId: number;
//   private target: string;
//   // DataType是大类  里面还有小类?
//   constructor(type: DataType, target?: string) {
//     this.type = type; //  什么类型的数据?
//     // 直接获取一次就够了
//     this.userInfo = {
//       userId: localStorage.getItem("userId"),
//       userName: localStorage.getItem("userName"),
//     };
//     this.info = {
//       browser: getBrowserInfo(),
//       os: getOSInfo(),
//     };
//     this.time = new Date().toLocaleString();
//     this.appId = 1001; // appId是该应用的appId
//     this.target = target;
//   }
//   // 直接保存 不用理会key这种东西
//   set(data: UpLoadData) {
//     // 相同的key 就会覆盖了?
//     this.data = data;
//   }
// }
// export class PerformanceData extends Data {
//   private loadPageTime: number;
//   private domReady: number;
//   private redirect: number;
//   private lookupDomain: number;
//   private TTFB: number;
//   private contentReady: number;
//   private connect: number;
//   private url: string;
//   constructor(
//     type: DataType,
//     target: string,
//     options: Partial<PerformanceOptions>
//   ) {
//     super(type, target);
//     const {
//       loadPageTime,
//       domReady,
//       redirect,
//       lookupDomain,
//       TTFB,
//       contentReady,
//       connect,
//     } = options;
//     // 页面加载完成时间
//     this.loadPageTime = loadPageTime; // 页面加载完成的时间
//     this.domReady = domReady; // 反省下你的 DOM 树嵌套是不是太多了！
//     this.redirect = redirect; // 拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
//     this.lookupDomain = lookupDomain; // DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
//     this.TTFB = TTFB; // 这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
//     this.contentReady = contentReady; // 页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
//     this.connect = connect; // TCP 建立连接完成握手的时间
//   }
// }
// export class ResourceData extends Data {
//   private resourceName: string;
//   private redirect: number;
//   private request: number;
//   private duration: number;
//   private connect: number;
//   constructor(
//     type: DataType,
//     target: string,
//     options: Partial<ResourceOptions>
//   ) {
//     super(type, target);
//     const { request, resourceName, duration, redirect, connect } = options;
//     // 页面加载完成时间
//     this.request = request; // 页面加载完成的时间
//     this.resourceName = resourceName; // 反省下你的 DOM 树嵌套是不是太多了！
//     this.redirect = redirect; // 拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
//     this.duration = duration; // DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
//     this.connect = connect; // TCP 建立连接完成握手的时间
//   }
// }
