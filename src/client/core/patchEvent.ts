import { Context } from "./../index";
// 把所有的事件都代理

type EventKeys = keyof WindowEventMap;

export default function patchEvent(context: Context) {
  // console.log(context, "event");
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
  eventMaps.forEach((val) => {
    window.addEventListener(val, (e: Event) => {
      console.log(e);
    });
  }, true);
}
