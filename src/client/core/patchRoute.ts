import { Context } from "./../index";
// 路由可能有几种 单页面 和 多页面的
import { getPageInfo } from "../utils/index";
import { Data } from "../data/index";

type historyKeys = keyof Pick<History, "pushState" | "replaceState">;

export default function patchRoute(context: Context) {
  patchHistory(context);
  patchHash(context);
}

function patchHistory(context: Context) {
  const historyFun: historyKeys[] = ["pushState", "replaceState"];

  historyFun.forEach((val) => {
    const originHistoryFun = window.history[val];
    window.history[val] = function (data: any, title: string, url?: string) {
      const historyData = Object.assign(context.data(), {
        timeStamp: new Date().toString(),
        mainType: "ROUTE",
        data: {
          routeData: JSON.stringify(data),
          title,
          url,
          routeType: val,
        },
        pageInfo: getPageInfo(),
        currentUrl: window.location.href,
        refererUrl: document.referrer || "/", // 看下来源
      });

      context.worker.add("indexDB", {
        operatorType: "add",
        tableName: "track",
        data: historyData,
      });

      return originHistoryFun && originHistoryFun.call(this, data, title, url);
    };
  });
}

function patchHash(context: Context) {
  const originHashChange = window.onhashchange;

  window.onhashchange = function (event: HashChangeEvent) {
    const url = "/" + window.location.hash.substr(1);

    const data: Data = Object.assign(context.data(), {
      timeStamp: new Date().toString(),
      mainType: "ROUTE",
      data: {
        url,
        routeType: "Hash",
      },
      pageInfo: getPageInfo(),
      currentUrl: window.location.href,
      refererUrl: document.referrer || "/", // 看下来源
    });

    context.worker.add("indexDB", {
      operatorType: "add",
      tableName: "track",
      data,
    });

    return originHashChange && originHashChange.call(this, event);
  };
}
