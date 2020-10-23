import patchConsole from "./core/patchConsole";
import patchError from "./core/patchError";
import patchEvent from "./core/patchEvent";
import patchPromise from "./core/patchPromise";
import patchRequest from "./core/patchRequest";
import patchRoute from "./core/patchRoute";

import { beautifyConsole } from "./utils/index";
import DB from "./data/dataBase";
import { Data } from "./data/index";
import { getBrowserInfo, getOSInfo, genNonDuplicateID } from "./utils/index";

const db = new DB("monitor");
// 引入 web worker 增强计算能力?
const worker = new Worker("../worker.js");

// 初始化 一些 data?
const data = new Data({
  userId: "AAAA",
  trackId: genNonDuplicateID(),
  device: {
    os: getOSInfo(),
    browser: getBrowserInfo(),
  },
  appVersion: 1.0,
  apiVersion: 1.0,
  appId: 1.0,
});
export interface Context {
  db: DB;
  data: Data;
  baseUrl:string;
}

// 传递的上下文 ... 单例
const context: Context = {
  db,
  data,
  baseUrl:"http://test.xiangyou.ouj.com:5000"
};

// 相当于先把这些 patch的 function 拿出来
// 然后 再注入 context?
const patchFunction = [
  patchConsole,
  patchError,
  patchEvent,
  patchPromise,
  patchRequest,
  patchRoute,
];

patchFunction.forEach((val) => {
  val(context);
});

beautifyConsole("[ MonitorSDK ]", "Starting Monitor");
