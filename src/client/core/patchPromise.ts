import { Context } from "../index";
import { ErrorData } from "../data/index";
import { getPageInfo } from "../utils/index";

export default function patchPromise(context: Context) {
  window.addEventListener("unhandledrejection", (e) => {
    const { reason, timeStamp } = e;
    const params = {
      reason,
      timeStamp,
    };

    const data: ErrorData = Object.assign(context.data(), {
      timeStamp: new Date().toString(),
      mainType: "PROMISE",
      data: params,
      pageInfo: getPageInfo(),
      currentUrl: window.location.href,
      refererUrl: document.referrer, // 看下来源
    }); // 覆盖第一个参数
    console.log(data);
    // 操作数据库 (这种是不是应该马上上报呢?) 发生错误 应该直接上报
    context.request(data, "/error");
    throw new Error("Test Promised");
  });
  // window.addEventListener("unhandledrejection", (event) => {
  //   console.log("unhandledrejection:" + event.reason); // 捕获后自定义处理
  // });
}
