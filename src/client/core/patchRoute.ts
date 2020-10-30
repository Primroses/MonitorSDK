import { Context } from "./../index";
// 路由可能有几种 单页面 和 多页面的
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
        mainType: "ROUTE",
        data: JSON.stringify({
          routeData: data,
          title,
          url,
          routeType: val,
        }),
      });

      context.addIndexDB(historyData, "track");

      return originHistoryFun && originHistoryFun.call(this, data, title, url);
    };
  });
}

function patchHash(context: Context) {
  const originHashChange = window.onhashchange;

  window.onhashchange = function (event: HashChangeEvent) {
    const url = "/" + window.location.hash.substr(1);

    const data: Data = Object.assign(context.data(), {
      mainType: "ROUTE",
      data: JSON.stringify({
        url,
        routeType: "Hash",
      }),
    });

    context.addIndexDB(data, "track");

    return originHashChange && originHashChange.call(this, event);
  };
}
