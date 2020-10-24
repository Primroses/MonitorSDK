import { Context } from "./../index";
import { ErrorData } from "../data/index";
import { getPageInfo } from "../utils/index";

// 10.24 看到的一个 warp Patch方法的一个操作
export default function warpPatch(context: Context) {
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
        return func.apply(this, args);
      } catch (e) {
        console.dir(e);
        const data: ErrorData = Object.assign(context.data(), {
          timeStamp: new Date().toString(),
          mainType: "EVENTLISTENER",
          data: e,
          pageInfo: getPageInfo(),
          currentUrl: window.location.href,
          refererUrl: document.referrer, // 看下来源
          eventType: e.name,
        }); // 覆盖第一个参数
        context.db.add("error", data);
      }
    };
    return nativeWindowEventListener.call(this, type, wrappedFunc, options); // 调用原生的方法，保证addEventListener正确执行
  };
}
