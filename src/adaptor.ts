// import { useReported } from "./reported";
// // import { store } from "./store";
// // 准确来说应该是Data适配器
// export class DataAdaptor {
//   // 中转队列 没有 保存数据的想法?
//   private type: string;
//   // private quene: UpLoadData[]; 不需要走内存存储

//   // 这样设计是不是有点问题 type 监控 | 上报
//   // 后续不设计成队列的形式 设计成适配器形式 不同类型 走不同处理
//   constructor(type: AdaptorType) {
//     this.type = type;
//     // this.quene = [];
//   }
//   async push(data: UpLoadData) {
//     const key = this.type.toLowerCase();
//     // 错误类型的数据 直接上报
//     if (key === "error") {
//       const ret = await useReported(data, "/error", "POST"); // 可能会失败吗?
//     } else if (key === "performance") {
//       // 性能类型的数据 window装载完在进行上报
//       const ret = await useReported(data, "/performance", "POST");
//       // console.log(data)
//       // 路径类型的 走本地存储 关闭上报
//     } else if (key === "resource") {
//       console.log(data);
//       const ret = await useReported(data, "/resource", "POST");
//     } else if (key === "track") {
//       // 直接通过type进行键的索引 灵活的增加或者减少
//       // 主要还是通过localStorage 进行 id的数据持久化
//       // let id = parseInt(localStorage.getItem(`${key}Id`) || "0", 10);
//       const result = localStorage.getItem(key) || ""; // 初始化/ 获取当前的数据(最多只有5m)
//       // 假如我不使用 indexDB 直接用 localstorage
//       localStorage.setItem(key, result + "| " + JSON.stringify(data));
//       // 这里因为某些原因放弃了 IndexedDB
//       // store.create(data, this.type.toLowerCase());
//     }
//   }
//   // 单纯打印一下 队列 里面的数据
// }

// // 不同类型的 上报规则也不同?
// export const ErrorAdaptor = new DataAdaptor("ERROR");
// export const TrackAdaptor = new DataAdaptor("TRACK");
// export const PerformanceAdaptor = new DataAdaptor("PERFORMANCE");
// export const ResourceAdaptor = new DataAdaptor("RESOURCE");
