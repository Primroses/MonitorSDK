import patchConsole from "./core/patchConsole";
import patchError from "./core/patchError";
import patchEvent from "./core/patchEvent";
import patchPromise from "./core/patchPromise";
import patchRequest from "./core/patchRequest";
import patchRoute from "./core/patchRoute";

import { beautifyConsole } from "./utils/index"

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
  val("Context");
});

beautifyConsole('[ MonitorSDK ]', 'Starting Monitor')