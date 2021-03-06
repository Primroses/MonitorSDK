import { Data } from "../data/index";
/**
 * 就不发ajax 直接图片 不影响页面的性能
 * @param {string} url
 */
export function useRequest(url: string) {
  // 1 x 1 也不浪费带宽 ?
  const request = new Image(1, 1);
  // 其实不一定是图片 只是一个url 就可以了也不用返回 url 就是接口地址...
  request.src = url;
}
type DataKey = keyof Data;

// 默认是传 data
export function getRequsetUrl(data: Data, url: string): string {
  let dataStr = url + "/abc.jpg" + "?" + "";
  function getDataStr(currentData: Data) {
    Object.keys(currentData).forEach((val: DataKey) => {
      if (
        Object.prototype.toString.call(currentData[val]) === "[object Object]"
      ) {
        getDataStr(currentData[val] as any);
      } else {
        dataStr += `${val}=${currentData[val]}&`;
      }
    });
  }
  getDataStr(data);
  dataStr = dataStr.substring(dataStr.lastIndexOf("&"), -1);
  // 这里可能还得要一个分割Id  因为用的是Get 请求 可能 会 超过url的限制
  return dataStr;
}

// 这样的话就会有跨域问题了....
export function postRequestUrl(data: Data, url: string) {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    // credentials: "include",
  };
  Object.defineProperty(config, "body", {
    value: JSON.stringify(data),
  });
  try {
    fetch(url, config as RequestInit);
  } catch (error) {
    console.error(error);
  }
}

// export function postConcurrent(){

// }

// 即时上报?

// 定时上报?
// export function useRequest

// 区块上报
