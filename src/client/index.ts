import patchConsole from "./core/patchConsole";
import patchError from "./core/patchError";
import patchEvent from "./core/patchEvent";
import patchPromise from "./core/patchPromise";
import patchRequest from "./core/patchRequest";
import patchRoute from "./core/patchRoute";
import patchPerformace from "./core/patchPerformace";
import warpPatch from "./core/wrapPatch";

import { beautifyConsole, deepClone } from "./utils/index";
import { useRequest, getRequsetUrl } from "./utils/request";
import DB from "./data/dataBase";
import { ErrorData, Data, TrackData } from "./data/index";
import { getBrowserInfo, getOSInfo, genNonDuplicateID } from "./utils/index";
// import DataQuene from "./data/dataQuene";

import { InitWorker, workerMain, worker } from "./worker/initWorker";

type ContextRequest = (data: Data & { tableName: string }, url: string) => void;
export interface Context {
  db: DB;
  data: () => Data | ErrorData | TrackData; // 工厂函数
  request: ContextRequest;
  // dataQuene: DataQuene;
  worker: InitWorker;
}

// 外面调用的主入口
// 再想想 options里面有什么
// baseUrl , userId ,appVersion apiVersion appId ,增加一个开关? 是否需要监听什么类型的?
export function initMonitor(options?: any) {
  const db = new DB("monitor");
  const data = new Data({
    userId: "1345854620",
    trackId: genNonDuplicateID(),
    device: {
      os: getOSInfo(),
      browser: getBrowserInfo(),
    },
    appVersion: 1.0,
    apiVersion: 1.0,
    appId: 1.0,
  });
  const req = (data: Data, url: string) => {
    const reqUrl = getRequsetUrl(
      data,
      "http://test.xiangyou.ouj.com:5000" + url
    );
    useRequest(reqUrl);
  };
  // 传递的上下文 ... 单例
  const context: Context = {
    db,
    data: () => deepClone(data), // 工厂函数
    request: req,
    worker,
  };

  workerMain(req);
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
  ];
  // 不用forEach是希望 串行 而不是并行，中间假如涉及异步了 也能一个个来
  for (let i = 0; i < patchFunction.length; i++) {
    patchFunction[i](context);
  }

  beautifyConsole("[ MonitorSDK ]", "Starting Monitor");
  // 返回一个可以上报的接口? 让可以强制上报？
  return {
    req,
  };
}
