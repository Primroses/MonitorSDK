import patchConsole from "./core/patchConsole";
import patchError from "./core/patchError";
import patchEvent from "./core/patchEvent";
import patchPromise from "./core/patchPromise";
import patchRequest from "./core/patchRequest";
import patchRoute from "./core/patchRoute";
import warpPatch from "./core/wrapPatch";

import { beautifyConsole, deepClone } from "./utils/index";
import { useRequest, getRequsetUrl } from "./utils/request";
import DB from "./data/dataBase";
import { ErrorData, Data } from "./data/index";
import { getBrowserInfo, getOSInfo, genNonDuplicateID } from "./utils/index";

export interface Context {
  db: DB;
  data: () => ErrorData; // 工厂函数
  request: (data: Data, url: string) => void;
}

// 外面调用的主入口
// 再想想 options里面有什么
// baseUrl , userId ,appVersion apiVersion appId ,增加一个开关? 是否需要监听什么类型的?
export function initMonitor(options?: any) {
  const db = new DB("monitor");
  // 引入 web worker 增强计算能力?
  new Worker("../worker.js");

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

  // 传递的上下文 ... 单例
  const context: Context = {
    db,
    data: () => deepClone(data),
    // baseUrl: "http://test.xiangyou.ouj.com:5000",
    request: (data, url) => {
      const reqUrl = getRequsetUrl(
        data,
        "http://test.xiangyou.ouj.com:5000" + url
      );
      useRequest(reqUrl);
    },
  };

  // 相当于先把这些 patch的 function 拿出来
  // 然后 再注入 context?
  const patchFunction = [
    warpPatch,
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
}

initMonitor();