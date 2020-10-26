import { Context } from "./../index";
import { ErrorData } from "../data/index";
import { getPageInfo } from "../utils/index";
type ConsoleKeys = keyof Console;

// 暂时不知道 劫持控制 台是什么情况 第三方库 自己的 console.warn? Vue 在生产环境也会tree shake 掉
export default function patchConsole(context: Context) {
  const ConsolesMap: ConsoleKeys[] = ["error", "warn"];
  ConsolesMap.forEach((val) => {
    // 保存一手
    const originConsoleFun = console[val];
    console[val] = function (message?: any, ...optionalParams: any[]) {
      const params = {
        message,
        ...optionalParams,
      };
      const data: ErrorData = Object.assign(context.data(), {
        timeStamp: new Date().toString(),
        mainType: "CONSOLE",
        data: params,
        pageInfo: getPageInfo(),
        currentUrl: window.location.href,
        refererUrl: document.referrer, // 看下来源
      });

      context.dataQuene.add("add", "error", data);

      return originConsoleFun.call(
        originConsoleFun,
        message,
        ...optionalParams
      );
    };
  });
}
