import { Context } from "./../index";
// 把所有的事件都代理

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
    if (!className && id) {
      return `${tagName.toLowerCase()}[id=${id}]`;
    } else if (!id && className) {
      return `${tagName.toLowerCase()}[class=${className.split(" ")}]`;
    } else if (!id && !className) {
      return `${tagName.toLowerCase()}`;
    }
    return `[${tagName.toLowerCase()}][id=${id}][class=${className.split(" ")}]`;
  };

  eventMaps.forEach((val) => {
    window.addEventListener(val, (e: any) => {
      const { tagName, id, className, outerHTML } = e.target;
      if (tagName != "HTML" && tagName != "BODY") {
        const params = {
          trackTarget: trackTarget(tagName, id, className),
          // offsetX: e.offsetX,
          // offsetY: e.offsetY,
          trackType: e.type,
          trackContent: outerHTML,
        };

        const data = Object.assign(context.data(), {
          mainType: "EVENT",
          data: JSON.stringify(params),
        });

        context.addIndexDB(data, "track");
      }
    });
  }, true);
}
