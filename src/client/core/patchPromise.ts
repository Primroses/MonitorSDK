import { Context } from "../index";
import { Data } from "../data/index";


export default function patchPromise(context: Context) {
  window.addEventListener("unhandledrejection", (e) => {
    const { reason } = e;
    const params = {
      reason,
    };
    const data: Data = Object.assign(context.data(), {
      mainType: "PROMISE",
      data: JSON.stringify({
        reason: params.reason,
      }),
    }); // 覆盖第一个参数

    // 操作数据库 (这种是不是应该马上上报呢?) 发生错误 应该直接上报
    context.request({ ...data, tableName: "error" }, "/error");
  });
}
