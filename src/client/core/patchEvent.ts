import { Context } from "./../index";
// 把所有的事件都代理
import { getPageInfo } from "../utils/index";
type EventKeys = keyof WindowEventMap;

export default function patchEvent(context: Context) {
  // 记录一些 用户常用的交互事件就可以了.... 其他的太多 怕 记录不过来
  const eventMaps: EventKeys[] = [
    "click",
    // "mousedown",
    // "mouseenter",
    // "mouseleave",
    // "mouseover",
    // "mouseup",
    // "mousewheel",
    // "dblclick",
    // "drag",
    // "dragend",
    // "dragenter",
    // "dragstart",
    // "dragover",
    // "dragleave",
    // "dragexit",
    // "drop",
    // "keydown",
    // "keypress",
    // "keyup",
    // "touchend",
    // "touchmove",
    // "touchend",
    "input",
  ];

  const trackTarget = (tagName: string, id: string, className: string) => {
    if (!className) {
      return `${tagName.toLowerCase()}#${id}`;
    } else if (!id) {
      return `${tagName.toLowerCase()}.${className.split(" ").join(".")}`;
    } else if (!id && !className) {
      return `${tagName.toLowerCase()}`;
    }
    return `${tagName.toLowerCase()}#${id}.${className.split(" ").join(".")}`;
  };

  eventMaps.forEach((val) => {
    window.addEventListener(val, (e: any) => {
      const { tagName, id, className, outerHTML } = e.target;
      console.log(tagName, tagName === "html", "tagName");
      if (tagName != "HTML") {
        const params = {
          trackTarget: trackTarget(tagName, id, className),
          offsetX: e.offsetX,
          offsetY: e.offsetY,
          trackType: e.type,
          trackContent: outerHTML,
        };

        const data = Object.assign(context.data(), {
          timeStamp: new Date().toString(),
          mainType: "EVENT",
          data: params,
          pageInfo: getPageInfo(),
          currentUrl: window.location.href,
          refererUrl: document.referrer ||  "/", // 看下来源
        });

        // context.worker.add("indexDB", {
        //   operatorType: "add",
        //   tableName: "track",
        //   data,
        // });
      }
    });
  }, true);
}
