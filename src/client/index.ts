import patchConsole from "./core/patchConsole";
import patchError from "./core/patchError";
import patchEvent from "./core/patchEvent";
import patchPromise from "./core/patchPromise";
import patchRequest from "./core/patchRequest";
import patchRoute from "./core/patchRoute";
import patchPerformace from "./core/patchPerformace";
import warpPatch from "./core/wrapPatch";
import customDot from "./core/customDot";
import { patchVue } from "./core/integrateFrame";

import { beautifyConsole, deepClone } from "./utils/index";
import { useRequest, getRequsetUrl, postRequestUrl } from "./utils/request";
import DB from "./data/dataBase";
import { Store, store } from "./utils/storage";
import { Data } from "./data/index";
import {
  getBrowserInfo,
  getOSInfo,
  genNonDuplicateID,
  getPageInfo,
} from "./utils/index";
// import DataQuene from "./data/dataQuene";

import { InitWorker, workerMain, worker } from "./worker/initWorker";

type ContextRequest = (data: Data & { tableName: string }, url: string) => void;
export interface Context {
  db: DB;
  data: () => Data; // 工厂函数
  request: ContextRequest;
  // dataQuene: DataQuene;
  worker: InitWorker;
  addIndexDB: (
    data: any,
    tableName?: string,
    operatorType?: OperatorType
  ) => void;
  store: Store;
  filterUrl: string[];
}

interface Options {
  baseUrl: string;
  userId: string;
  Vue: any;
}

// 外面调用的主入口
// 再想想 options里面有什么
// baseUrl , userId ,appVersion apiVersion appId ,增加一个开关? 是否需要监听什么类型的?
export function initMonitor(options: Options) {
  const db = new DB("monitor");
  const { baseUrl, userId, Vue } = options;
  const initData = new Data({
    userId,
    trackId: genNonDuplicateID(),
    device: {
      os: getOSInfo(),
      browser: getBrowserInfo(),
    },
    appVersion: 1.0,
    apiVersion: 1.0,
    appId: 1.0,
    pageInfo: getPageInfo(),
    currentUrl: window.location.href,
    refererUrl: document.referrer || "/", // 看下来源
    timeStamp: new Date().toString(),
  });
  // 这个是new Image
  const getReq = (data: Data, url: string) => {
    const reqUrl = getRequsetUrl(data, baseUrl + url);
    useRequest(reqUrl);
  };
  // 这里是fetch
  const postReq = (data: Data, url: string) => {
    postRequestUrl(data, baseUrl + url);
  };

  // 传递的上下文 ... 单例
  const context: Context = {
    db,
    data: () => deepClone(initData), // 工厂函数
    request: getReq,
    worker,
    addIndexDB: (
      data: any,
      tableName: string = "error",
      operatorType: OperatorType = "add"
    ) => worker.add("indexDB", { operatorType, tableName, data }),
    store,
    filterUrl: ["login", "register", "postError", "sockjs-node"],
  };

  workerMain(getReq, postReq);
  // 初始化 一些 data?

  // 相当于先把这些 patch的 function 拿出来
  // 然后 再注入 context?
  const patchFunction = [
    warpPatch,
    patchPerformace,
    patchConsole,
    patchError,
    patchEvent,
    patchPromise,
    patchRequest,
    patchRoute,
    customDot,
    // patchVue,
  ];
  // 不用forEach是希望 串行 而不是并行，中间假如涉及异步了 也能一个个来
  for (let i = 0; i < patchFunction.length; i++) {
    patchFunction[i](context);
  }
  patchVue(context, Vue);
  beautifyConsole("[ MonitorSDK ]", "Starting Monitor");
  // 返回一个可以上报的接口? 让可以强制上报？
  return {
    getReq,
  };
}
