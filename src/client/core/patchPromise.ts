import { Context } from "../index";
import { ErrorData } from "../data/index";
import { getPageInfo, deepClone } from "../utils/index";
import { useRequest, getRequsetUrl } from "../utils/request";

export default function patchPromise(context: Context) {
  window.addEventListener("unhandledrejection", function (e) {
    const { reason, timeStamp } = e;
    const params = {
      reason,
      timeStamp,
    };
    const data: ErrorData = Object.assign(deepClone(context.data), {
      timeStamp: new Date().toString(),
      mainType: "PROMISE",
      data: params,
      pageInfo: getPageInfo(),
      currentUrl: window.location.href,
      refererUrl: document.referrer, // 看下来源
    }); // 覆盖第一个参数
    // 操作数据库 (这种是不是应该马上上报呢?) 发生错误 应该直接上报
    const url = getRequsetUrl(data, context.baseUrl + "/error");
    useRequest(url);
  });
}
