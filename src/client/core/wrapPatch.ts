import { Context } from "./../index";
import { ErrorData } from "../data/index";
import { getPageInfo } from "../utils/index";

// 10.24 看到的一个 warp Patch方法的一个操作
export default async function warpPatch(context: Context) {
  // const DBRequest = await context.db.DBResolve();
  const nativeWindowEventListener = window.addEventListener;
  window.addEventListener = function <K extends keyof WindowEventMap>(
    type: K,
    func: (ev: WindowEventMap[K]) => any,
    options: boolean | AddEventListenerOptions
  ) {
    // 重写原生方法。
    const wrappedFunc = function (...args: any) {
      // 将回调函数包裹一层try catch
      try {
        // args.forEach((ele: Object) => {
        //   const type = Object.prototype.toString.call(ele).slice(8, -1);
        //   console.log(ele);
        //   console.log(type);
        // });
        return func.apply(this, args);
      } catch (e) {
        const data: ErrorData = Object.assign(context.data(), {
          timeStamp: new Date().toString(),
          mainType: "EVENTLISTENER",
          data: e,
          pageInfo: getPageInfo(),
          currentUrl: window.location.href,
          refererUrl: document.referrer, // 看下来源
          eventType: e.name,
        }); // 覆盖第一个参数

        // 这些数据需要先过滤 在发
        // context.dataQuene.add((DBRequest) =>
        //   context.db.add(DBRequest, "error", data)
        // );

        context.dataQuene.add("add", "error", data);
      }
    };
    return nativeWindowEventListener.call(this, type, wrappedFunc, options); // 调用原生的方法，保证addEventListener正确执行
  };
}
