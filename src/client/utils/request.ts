import { Data } from "../data/index";
/**
 * 就不发ajax 直接图片 不影响页面的性能
 * @param {string} url
 */
function useRequest(url: string) {
  // 1 x 1 也不浪费带宽 ?
  const request = new Image(1, 1);
  // 其实不一定是图片 只是一个url 就可以了也不用返回 url 就是接口地址...
  request.src = url;
}
type DataKey = keyof Data;

export function getRequsetUrl(url: string, data: Data): string {
  let dataStr = url + "?" + "";

  Object.keys(data).forEach((val: DataKey) => {
    dataStr += `${val}=${data[val]}&`;
  });

  dataStr.substring(dataStr.lastIndexOf("&"), -1);

  return dataStr;
}

// 即时上报?

// 定时上报?
// export function useRequest

// 区块上报
