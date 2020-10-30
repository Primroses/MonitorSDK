import { Context } from "./../index";
import { Data } from "../data/index";

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
        // console.dir(e);
        if (e) {
          const data: Data = Object.assign(context.data(), {
            mainType: "EVENTLISTENER",
            data: JSON.stringify({
              message: e.message,
              stack: e.stack,
            }),
            eventType: e.name,
          }); // 覆盖第一个参数

          context.addIndexDB(data);
        }
      }
    };
    return nativeWindowEventListener.call(this, type, wrappedFunc, options); // 调用原生的方法，保证addEventListener正确执行
  };
}
