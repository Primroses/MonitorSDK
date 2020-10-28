import { Context } from "./../index";
import { getPageInfo } from "../utils/index";
// 代理用户的请求
export default function patchRequest(context: Context) {
  // console.log(context, "Request");
  patchAjax(context);
}

// 这里还是分开操作吧 一起操作可能会出事  虽然不太可能一个项目 又用fetch 又有ajax
function patchAjax(context: Context) {
  const filterUrl = ["login", "register"];

  let currentTime = 0;
  // 这里的数据得组装
  const dataMap = new Map<number, { [key: string]: any }>();

  const originOpen = XMLHttpRequest.prototype.open;
  const originSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (method: string, url: string) {
    if (filterUrl.indexOf(url) < 0) {
      const params = {
        method,
        url,
      };
      dataMap.set(currentTime, params);
    }
    return originOpen && originOpen.call(this, method, url);
  };

  XMLHttpRequest.prototype.send = function (
    body?:
      | string
      | Document
      | Blob
      | ArrayBufferView
      | ArrayBuffer
      | FormData
      | URLSearchParams
      | ReadableStream<Uint8Array>
  ) {
    // 直接插进去 最后都会变成 一层的 一起发送
    const params = dataMap.get(currentTime);

    const data = Object.assign(context.data(), {
      timeStamp: new Date(),
      mainType: "REQUEST",
      data: {
        ...params,
        body,
      },
      pageInfo: getPageInfo(),
      currentUrl: window.location.href,
      refererUrl: document.referrer || "/", // 看下来源
    });
    console.log(data)
    context.worker.add("indexDB", {
      operatorType: "add",
      tableName: "track",
      data,
    });

    currentTime += 1;
    return originSend && originSend.call(this, body);
  };
}
