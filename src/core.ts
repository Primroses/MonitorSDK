import { Data, PerformanceData, ResourceData } from "./data";
import {
  ErrorAdaptor,
  TrackAdaptor,
  DataAdaptor,
  PerformanceAdaptor,
  ResourceAdaptor,
} from "./adaptor";
import { beautifyConsole } from "./utils";
// 初始化监控的东西
export function initMonitor() {
  MonitorError(); // 代理 window.onerror
  MonitorPromise(); // 代理 window.addEventListener("unhandledrejection")
  MonitorTrack(); // 代理用户的行动路径
  MonitorFetch(); // 代理用户的请求
  MonitorEvent(); // 代理事件
  MonitorPerformance(); // 性能指标....
  reportData(); // 初始化上报的
  beautifyConsole('[ MonitorSDK ]', 'Starting Monitor')
}

// 监听 error 上面的错误
function MonitorError() {
  window.addEventListener(
    "error",
    function (e: any) {
      // 判断是否有资源加载错误的....
      let data: Data;
      if (!e.cancelable) {
        var { localName, href, src } = e.target;
        let sourceUrl = "";
        if (localName === "link") {
          sourceUrl = href;
        } else {
          sourceUrl = src;
        }
        const params = {
          resourceType: localName,
          sourceUrl,
        };
        handleExtractData("RESOURCE", params, ErrorAdaptor, "resource");
      } else {
        // 就是脚本发生错误了
        const {
          lineno,
          filename,
          timeStamp,
          error: { message, stack },
        } = e;
        const params = {
          lineno,
          filename,
          timeStamp,
          message,
          stack,
        };
        handleExtractData("ERROR", params, ErrorAdaptor, "script");
      }
    },
    true
  );
}

function MonitorPromise() {
  window.addEventListener("unhandledrejection", function (e) {
    const { reason, timeStamp } = e;
    const params = {
      reason,
      timeStamp,
    };
    handleExtractData("PROMISE", params, ErrorAdaptor, "promise");
  });
}

// 更多的还是 SPA 少部分旧的项目可能会用到Window.open
function MonitorTrack(type = "SPA") {
  // 默认还是会监听 SPA的
  if (type !== "SPA") {
    // 保存一下原始的方法
    const originOpen = window.open;
    // 代理一下记录一下他的行动路径
    window.open = function () {
      const url = window.location.href;
      const params = {
        url,
      };
      // 这是监控的是路径
      handleExtractData("TRACK", params, TrackAdaptor, "open");
      return originOpen && originOpen.apply(this, arguments);
    };
    // 这里还可以 拦截a 标签 document.getElmentByTagNames("a") ....
  } else {
    const historyArr: HistoryFun[] = ["pushState", "replaceState"];
    historyArr.forEach((val) => {
      const originFun = history[val];
      history[val] = function (...args) {
        const [, , url] = args;
        const params = {
          url,
        };
        handleExtractData("TRACK", params, TrackAdaptor, "history");
        return originFun && originFun.apply(this, args);
      };
    });
    // 另外一种 hashchange 的监控 监听事件 不需要覆写
    window.onhashchange = function () {
      const url = window.location.hash.substr(-1);
      const params = {
        url,
      };
      handleExtractData("TRACK", params, TrackAdaptor, "hashChange");
    };
  }
}

function MonitorFetch() {
  // fetch 跟 ajax 都应该进行监听
  //  open 跟 send 是 一起执行的 所以整一次的data 两个共同完成
  const fetchdata = new Data("AJAX", "Fetch"); // 属于AJAX类型
  // 假如是用fetch 的就得覆写fetch
  const originFetch = window.fetch;
  window.fetch = function (input: RequestInfo, init?: RequestInit) {
    const params = {
      input,
      init,
    };
    fetchdata.set(params);
    TrackAdaptor.push(fetchdata);
    return originFetch && originFetch.call(this, input, init);
  };
  // 这里是用 原生ajax (包括axios 也是原生ajax)
  // send 跟 open 是不同的操作
  const Ajaxdata = new Data("AJAX", "ajax"); // 属于AJAX类型
  const originOpen = XMLHttpRequest.prototype.open;
  // 这里的open 是一个对象属性来的 如果要赋值 右边就得变成一个对象才是
  XMLHttpRequest.prototype.open = function (method: string, url: string) {
    // 后面三个参数好像都用不上。。。
    const params = {
      method,
      url,
    };
    Ajaxdata.set(params);
    return originOpen && originOpen.call(this, method, url);
  } as any;

  const originSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (body: any) {
    console.log(body);
    Ajaxdata.set(body);
    return originSend && originSend.call(this, body);
  };
  // 监控用户信息的
  TrackAdaptor.push(Ajaxdata);
}

function MonitorEvent() {
  // 代理事件好像不太现实？(假如有事件是阻止冒泡 你就没了,所以我们可以转为用捕获阶段进行)
  window.addEventListener(
    "click",
    // 不太知道用什么类型 Event 里面的好像也不是
    (e: any) => {
      const [currentTarget] = e.path;
      const globalEnv = [
        document.getElementsByTagName("body")[0],
        document.getElementsByTagName("html")[0],
        document,
      ];
      // 点中里面的元素进行交互再封装数据再上报
      if (!globalEnv.includes(currentTarget)) {
        console.log(e.path, currentTarget.outerHTML);
        // 不能把HTML节点直接上传
        const params = {
          target: currentTarget.outerHTML,
        };
        handleExtractData("EVENT", params, TrackAdaptor, "click");
      }
    },
    true
  );
}

function reportData() {
  let data: any[] = localStorage
    .getItem("track")
    .split("|")
    .filter(Boolean)
    .map(JSON.parse as any);
  localStorage.setItem("track", "");
  // 这里过滤的逻辑还得优化一下
  data = data
    .map((val) => {
      if (val.data && val.data.input && val.data.input.includes("record")) {
        return false;
      }
      if (val.data && val.data.url && val.data.url.includes("record")) {
        return false;
      }
      if (!val.data) {
        return false;
      }
      return val;
    })
    .filter(Boolean);
  console.log(data);
  // 关闭的时候会触发 在关闭的时候 再上报想上报的东西
  window.addEventListener("beforeunload", function () {
    if (navigator.sendBeacon) {
      // 这里需要把 indexDB里面的 东西抽出来 这里是异步的 是否要考虑放弃IndexDB?
      navigator.sendBeacon(
        "http://localhost:3000/record/track",
        JSON.stringify(data)
      );
    } else {
      var client = new XMLHttpRequest();
      client.open("POST", "http://localhost:3000/record/track", false); // 第三个参数表明是同步的 xhr
      client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      client.send(JSON.stringify(data));
    }
  });
}

function MonitorPerformance() {
  // 获取当前页面的Performance
  getWindowPerformance();
  // 获取资源的性能
}

// 提取数据的 整合的时候 不需要写的这么繁琐
function handleExtractData(
  type: DataType,
  params: { [key: string]: any },
  adaptor: DataAdaptor,
  target: string
) {
  const data = new Data(type, target);
  data.set(params);
  adaptor.push(data);
}

// 整个应用加载的性能？
function getWindowPerformance() {
  const performance = window.performance;

  if (!performance) {
    // 当前浏览器不支持
    console.log("你的浏览器不支持 performance 接口");
    return;
  }
  const times = performance.timing;
  // 因为刚开始的时候 不会有loadEventEnd 所以会有负数 需要轮询才行
  let timer = setInterval(() => {
    if (times.loadEventEnd !== 0) {
      clearInterval(timer);
      timer = null;
      const options: Partial<PerformanceOptions> = {};

      options.loadPageTime = times.loadEventEnd - times.navigationStart; //页面加载完成的时间
      options.domReady = times.domComplete - times.responseEnd; //解析 DOM 树结构的时间
      options.redirect = times.redirectEnd - times.redirectStart; // 重定向的时间
      options.lookupDomain = times.domainLookupEnd - times.domainLookupStart; // DNS 查询时间
      options.TTFB = times.responseStart - times.navigationStart; // 读取页面第一个字节的时间
      options.contentReady = times.responseEnd - times.requestStart; // 内容加载完成的时间
      options.connect = times.connectEnd - times.connectStart; // TCP 建立连接完成握手的时间
      const PData = new PerformanceData("PERFORMANCE", "window", options);
      PerformanceAdaptor.push(PData);
      getResourcePerformance();
    }
  }, 10);
}

function getResourcePerformance() {
  // 上报加载资源的信息 是否正常加载 加载的速度是多大
  const resourceArr = ["link", "script", "img"];

  const data = window.performance
    .getEntriesByType("resource")
    .map((val: any) => {
      if (resourceArr.indexOf(val.initiatorType) > -1) {
        const options: Partial<ResourceOptions> = {};
        options.resourceName = val.name.substr(val.name.lastIndexOf("/") + 1); // 资源名字
        options.duration = val.duration; // 加载时间
        options.request = val.responseEnd - val.requestStart; // 资源加载时间
        options.redirect = val.redirectEnd - val.redirectStart; // 重定向时间
        options.connect = val.connectEnd - val.connectStart; // TCP链接的时间
        return new ResourceData("RESOURCE", val.initiatorType, options);
      }
    })
    .filter(Boolean);
  ResourceAdaptor.push(data);
}
