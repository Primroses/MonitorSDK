import { Context } from "../index";
// 用户打点的需求...
// 可以全打点 也可以 针对打点....
// 可以前端设计 后端设计也行...
// 自定义打点需求。。。
export default function customDot(context: Context) {
  const CUSTOMCLASS = "monitor-click";
  const CUSTOMATTR = "data-click";
  // 首先得有元素 然后元素上面的属性 可以 一并上传。。。  直接封装好了....
  // 肯定是className  然后 data-attr 这样
  window.addEventListener("click", function (event: any) {
    const target = event.target;
    const customEl = Array.from(document.querySelectorAll(`.${CUSTOMCLASS}`));

    if (target.className.indexOf(CUSTOMCLASS) > -1) {
      const attr = target.getAttribute(CUSTOMATTR);
      // console.log(target.getAttribute(CUSTOMATTR));
      // 这里就可以开始上报了? 自定义 覆盖打点规则
      // context.request()
      console.log("[Monitor-Click]", target, attr);
    }
  });

  window.onload = function () {
    recordPV(context);
  };
}

function recordPV(context: Context) {
  // 先搞定时间....
  let currentDate = new Date().toLocaleDateString();
  currentDate = currentDate.indexOf("/")
    ? currentDate.replace(/(\/)/g, "")
    : currentDate.replace(/-/g, "");
  // console.log(date);
  const PV = context.store.get("PV");
  if (!PV || PV === "undefined") {
    const data = {
      date: currentDate,
      pv: 1,
    };
    context.store.set("PV", JSON.stringify(data));
  } else {
    let { date, pv } = JSON.parse(PV);
    if (date === currentDate) {
      pv += 1;
      context.store.set("PV", JSON.stringify({ date, pv }));
    } else {
      // 假如这逼第二天发了 在记录一下 是不是有点过时了? 这里其实需要后端的配合....
      // 还是无脑发算了?
      // context.request()
    }
  }

  // PV(访问量)  ：即Page View, 即页面浏览量或点击量，用户每次刷新即被计算一次。
  // UV(独立访客)：即Unique Visitor,访问您网站的一台电脑客户端为一个访客。00:00-24:00内相同的客户端只被计算一次。
}

//   window.addEventListener("beforeunload", function () {
//     if (navigator.sendBeacon) {
//       // 这里需要把 indexDB里面的 东西抽出来 这里是异步的 是否要考虑放弃IndexDB?
//       navigator.sendBeacon(
//         "http://localhost:3000/record/track",
//         JSON.stringify(data)
//       );
//     } else {
//       var client = new XMLHttpRequest();
//       client.open("POST", "http://localhost:3000/record/track", false); // 第三个参数表明是同步的 xhr
//       client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
//       client.send(JSON.stringify(data));
//     }
//   });