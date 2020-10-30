import { Context } from "./../index";
import { Data } from "../data/index";
type ConsoleKeys = keyof Console;

// 暂时不知道 劫持控制 台是什么情况 第三方库 自己的 console.warn? Vue 在生产环境也会tree shake 掉
export default function patchConsole(context: Context) {
  const ConsolesMap: ConsoleKeys[] = ["error", "warn"];
  ConsolesMap.forEach((val) => {
    // 保存一手
    const originConsoleFun = console[val];
    console[val] = function (message?: any, ...optionalParams: any[]) {
      const data: Data = Object.assign(context.data(), {
        mainType: "CONSOLE",
        data: JSON.stringify({
          message,
        }),
      });

      context.addIndexDB(data);

      return originConsoleFun.call(
        originConsoleFun,
        message,
        ...optionalParams
      );
    };
  });
}
