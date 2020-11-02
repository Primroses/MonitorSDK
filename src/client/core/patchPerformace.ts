import { channel } from '../EventChannel/index';
import { Context } from "../index";
import { Data } from "../data/index";

// 记录性能的
export default function patchPerformace(context: Context) {
  if (!window.performance) {
    console.error("[ MonitorSDK ] This browser does not support performance");
    return false;
  }
  // 在timing 废弃之前 先用这个....
  const { timing } = window.performance;
  if (timing) {
    let timer = setInterval(() => {
      if (timing.loadEventEnd) {
        const params = {
          loadPageTime: timing.loadEventEnd - timing.navigationStart, //页面加载完成的时间
          domReady: timing.domComplete - timing.responseEnd, //解析 DOM 树结构的时间
          redirect: timing.redirectEnd - timing.redirectStart, // 重定向的时间
          lookupDomain: timing.domainLookupEnd - timing.domainLookupStart, // DNS 查询时间
          TTFB: timing.responseStart - timing.navigationStart, // 读取页面第一个字节的时间
          contentReady: timing.responseEnd - timing.requestStart, // 内容加载完成的时间
          connect: timing.connectEnd - timing.connectStart, // TCP 建立连接完成握手的时间
        };

        const data: Data = Object.assign(context.data(), {
          mainType: "Performance",
          data: JSON.stringify(params),
        });
        context.addIndexDB(data, "performance");
        channel.publish("IDLE");
        clearInterval(timer);
        timer = null;
      }
    }, 1000);
  }
  getResourcePerformance(context);
}
function getResourcePerformance(context: Context) {
  const resourceArr = ["link", "script", "img"];
  const params = window.performance
    .getEntriesByType("resource")
    .map((val: any) => {
      if (resourceArr.indexOf(val.initiatorType) > -1) {
        return {
          name: val.name.substr(val.name.lastIndexOf("/") + 1),
          duration: val.duration,
          request: val.responseEnd - val.requestStart,
          redirect: val.redirectEnd - val.redirectStart,
          connect: val.connectEnd - val.connectStart,
        };
      }
    })
    .filter(Boolean);

  const data: Data = Object.assign(context.data(), {
    mainType: "Performance",
    data: JSON.stringify(params),
  });

  context.addIndexDB(data, "performance");
}


