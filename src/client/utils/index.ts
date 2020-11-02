/** 探测 浏览器
 * @returns
 */
export function getBrowserInfo() {
  const inBrowser = typeof window !== "undefined";
  const ua = inBrowser && window.navigator.userAgent.toLowerCase();
  const isIE = ua && /msie|trident/.test(ua);
  const isEdge = ua && ua.indexOf("edge/") > 0;
  const isChrome = ua && /chrome\/\d+/.test(ua) && !isEdge;
  const isOpera = ua && (ua.indexOf("opera") > -1 || ua.indexOf("opr") > -1);
  const isSafari =
    ua && ua.indexOf("safari") > -1 && ua.indexOf("chrome") === -1;
  const isQQ = ua && ua.indexOf("mqqbrowser") > 0;
  const isFF = ua && ua.indexOf("firefox") > -1;
  const isUC = ua && ua.indexOf("ucbrowser/") > 0;
  const isBaidu = ua && ua.indexOf("baiduboxapp") > 0;
  const isAndroid = ua && ua.indexOf("android") > 0;
  const isIOS = ua && /iphone|ipad|ipod|ios/.test(ua);
  // 组装数据 省掉 更多的if else的判断
  const BrowerTypeArr = [
    isIE,
    isEdge,
    isChrome,
    isOpera,
    isSafari,
    isQQ,
    isFF,
    isUC,
    isBaidu,
    isAndroid,
    isIOS,
  ];
  const BrowerRetArr = [
    "IE",
    "Edge",
    "Chrome",
    "Opera",
    "Safari",
    "QQ",
    "FF",
    "UC",
    "Baidu",
    "Android",
    "IOS",
  ].map((val) => {
    return {
      type: val,
      ua,
    };
  });

  const index = BrowerTypeArr.map((val, index) => {
    if (val) {
      return index;
    }
  }).filter(Boolean)[0];

  return BrowerRetArr[index] ? BrowerRetArr[index] : { type: "unknow", ua };
}

// 简单判断
export function getOSInfo() {
  let sUserAgent = navigator.userAgent;
  let isWin = navigator.platform == "Win32" || navigator.platform == "Windows";
  let isMac =
    navigator.platform == "Mac68K" ||
    navigator.platform == "MacPPC" ||
    navigator.platform == "Macintosh" ||
    navigator.platform == "MacIntel";
  if (isMac) return "Mac";
  let isUnix = navigator.platform == "X11" && !isWin && !isMac;
  if (isUnix) return "Unix";
  let isLinux = String(navigator.platform).indexOf("Linux") > -1;
  if (isLinux) return "Linux";
  if (isWin) {
    let isWin2K =
      sUserAgent.indexOf("Windows NT 5.0") > -1 ||
      sUserAgent.indexOf("Windows 2000") > -1;
    if (isWin2K) return "Win2000";
    let isWinXP =
      sUserAgent.indexOf("Windows NT 5.1") > -1 ||
      sUserAgent.indexOf("Windows XP") > -1;
    if (isWinXP) return "WinXP";
    let isWin2003 =
      sUserAgent.indexOf("Windows NT 5.2") > -1 ||
      sUserAgent.indexOf("Windows 2003") > -1;
    if (isWin2003) return "Win2003";
    let isWinVista =
      sUserAgent.indexOf("Windows NT 6.0") > -1 ||
      sUserAgent.indexOf("Windows Vista") > -1;
    if (isWinVista) return "WinVista";
    let isWin7 =
      sUserAgent.indexOf("Windows NT 6.1") > -1 ||
      sUserAgent.indexOf("Windows 7") > -1;
    if (isWin7) return "Win7";
    let isWin10 =
      sUserAgent.indexOf("Windows NT 10") > -1 ||
      sUserAgent.indexOf("Windows 10") > -1;
    if (isWin10) return "Win10";
  }
  return "other";
}

export const beautifyConsole = (function (originFun) {
  const headStyle = [
    `font-family: "Microsoft YaHei", Arial, freesans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";`,
    "color:white;",
    "font-size:12px;",
    "maring:5px 0;",
    "background:yellowgreen;",
  ];
  const style = ["color:black;", "font-size:12px;"];
  // console.log(style.join(''))
  return function (head: string, message: string) {
    originFun.call(
      originFun,
      `%c ${head} %c ${message}`,
      headStyle.join(""),
      style.join("")
    );
  };
})(console.log);

/** 循环任务 setTimeOut 更精确一点
 *  循环的时间
 * @param {Number} time
 */
export function cycleTask(time: number, callBack: Function) {
  let count = 0; // 乘以误差
  const startTime = new Date().getTime();
  let timeCounter = setTimeout(_cycleTask, time);
  function _cycleTask() {
    count++;
    const offset = new Date().getTime() - (startTime + count * time);
    let nextTime = time - offset;
    if (nextTime < 0) {
      nextTime = 0;
    }
    callBack();
    console.log("误差：" + offset + "ms，下一次执行：" + nextTime);
    timeCounter = setTimeout(_cycleTask, nextTime);
  }
}

// 可能得有兼容性 考虑
export function getPageInfo() {
  return {
    pageWidth: document.body ? document.body.clientWidth : 0,
    pageHeight: document.body ? document.body.clientHeight : 0,
    screenWidth: window.screen.width || 0,
    screenHeight: window.screen.height || 0,
  };
}

export function deepClone(obj: any, map = new Map()) {
  if (typeof obj != "object") {
    return;
  }
  // 当循环的时候 见到有 相同的引用的 直接返回
  if (map.has(obj)) return map.get(obj);
  let _obj: any = Array.isArray(obj) ? [] : {};
  map.set(obj, _obj);
  for (let key in obj) {
    _obj[key] =
      typeof obj[key] === "object" ? deepClone(obj[key], map) : obj[key];
  }
  return _obj;
}

export function genNonDuplicateID() {
  let idStr = Date.now().toString(36);
  idStr += Math.random().toString(36).substr(3);
  return idStr;
}

/**
     * 计算字符串所占的内存字节数，默认使用UTF-8的编码方式计算，也可制定为UTF-16
     * UTF-8 是一种可变长度的 Unicode 编码格式，使用一至四个字节为每个字符编码
     * 
     * 000000 - 00007F(128个代码)      0zzzzzzz(00-7F)                             一个字节
     * 000080 - 0007FF(1920个代码)     110yyyyy(C0-DF) 10zzzzzz(80-BF)             两个字节
     * 000800 - 00D7FF 
       00E000 - 00FFFF(61440个代码)    1110xxxx(E0-EF) 10yyyyyy 10zzzzzz           三个字节
     * 010000 - 10FFFF(1048576个代码)  11110www(F0-F7) 10xxxxxx 10yyyyyy 10zzzzzz  四个字节
     * 
     * 注: Unicode在范围 D800-DFFF 中不存在任何字符
     * {@link http://zh.wikipedia.org/wiki/UTF-8}
     * 
     * UTF-16 大部分使用两个字节编码，编码超出 65535 的使用四个字节
     * 000000 - 00FFFF  两个字节
     * 010000 - 10FFFF  四个字节
     * 
     * {@link http://zh.wikipedia.org/wiki/UTF-16}
     * @param  {String} str 
     * @param  {String} charset utf-8, utf-16
     * @return {Number}
     */
export function sizeof(str: string, charset: string = "utf8") {
  var total = 0,
    charCode,
    i,
    len;
  charset = charset ? charset.toLowerCase() : "";
  if (charset === "utf-16" || charset === "utf16") {
    for (i = 0, len = str.length; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode <= 0xffff) {
        total += 2;
      } else {
        total += 4;
      }
    }
  } else {
    for (i = 0, len = str.length; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode <= 0x007f) {
        total += 1;
      } else if (charCode <= 0x07ff) {
        total += 2;
      } else if (charCode <= 0xffff) {
        total += 3;
      } else {
        total += 4;
      }
    }
  }
  return total;
}

export function flatten(arr: any) {
  return arr.reduce((a: any, b: any) => {
    if (Array.isArray(b)) {
      return a.concat(flatten(b));
    }
    return a.concat(b);
  }, []);
}
