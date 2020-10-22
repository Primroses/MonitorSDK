import patchConsole from "./core/patchConsole";
import patchError from "./core/patchError";
import patchEvent from "./core/patchEvent";
import patchPromise from "./core/patchPromise";
import patchRequest from "./core/patchRequest";
import patchRoute from "./core/patchRoute";

import { beautifyConsole } from "./utils/index";
import DB from "./data/dataBase";
import { Data } from "./data/index";
import { getBrowserInfo, getOSInfo } from "./utils/index";

const db = new DB("monitor");
const worker = new Worker("./worker.js");
// 初始化 一些 data?
const data = new Data({
  userId: "AAAA",
  // trackId: "001",
  device: {
    os: getOSInfo(),
    browser: getBrowserInfo(),
  },
  appVersion: 1.0,
  apiVersion: 1.0,
});
export interface Context {
  db: DB;
  data: Data;
}

const context: Context = {
  db,
  data,
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
