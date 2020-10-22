// /** 探测 浏览器
//  * @returns
//  */
// export function getBrowserInfo() {
//   const inBrowser = typeof window !== "undefined";
//   const UA = inBrowser && window.navigator.userAgent.toLowerCase();
//   const isIE = UA && /msie|trident/.test(UA);
//   const isEdge = UA && UA.indexOf("edge/") > 0;
//   const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
//   const isOpera = UA && (UA.indexOf("opera") > -1 || UA.indexOf("opr") > -1);
//   const isSafari =
//     UA && UA.indexOf("safari") > -1 && UA.indexOf("chrome") === -1;
//   const isQQ = UA && UA.indexOf("mqqbrowser") > 0;
//   const isFF = UA && UA.indexOf("firefox") > -1;
//   const isUC = UA && UA.indexOf("ucbrowser/") > 0;
//   const isBaidu = UA && UA.indexOf("baiduboxapp") > 0;
//   const isAndroid = UA && UA.indexOf("android") > 0;
//   const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
//   // 组装数据 省掉 更多的if else的判断
//   const BrowerTypeArr = [
//     isIE,
//     isEdge,
//     isChrome,
//     isOpera,
//     isSafari,
//     isQQ,
//     isFF,
//     isUC,
//     isBaidu,
//     isAndroid,
//     isIOS,
//   ];
//   const BrowerRetArr = [
//     "IE",
//     "Edge",
//     "Chrome",
//     "Opera",
//     "Safari",
//     "QQ",
//     "FF",
//     "UC",
//     "Baidu",
//     "Android",
//     "IOS",
//   ].map((val) => {
//     return {
//       type: val,
//       UA,
//     };
//   });

//   const index = BrowerTypeArr.map((val, index) => {
//     if (val) {
//       return index;
//     }
//   }).filter(Boolean)[0];

//   return BrowerRetArr[index] ? BrowerRetArr[index] : { type: "unknow", UA };
// }

// // 简单判断
// export function getOSInfo() {
//   let sUserAgent = navigator.userAgent;
//   let isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
//   let isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
//   if (isMac) return "Mac";
//   let isUnix = (navigator.platform == "X11") && !isWin && !isMac;
//   if (isUnix) return "Unix";
//   let isLinux = (String(navigator.platform).indexOf("Linux") > -1);
//   if (isLinux) return "Linux";
//   if (isWin) {
//       let isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
//       if (isWin2K) return "Win2000";
//       let isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
//       if (isWinXP) return "WinXP";
//       let isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
//       if (isWin2003) return "Win2003";
//       let isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
//       if (isWinVista) return "WinVista";
//       let isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
//       if (isWin7) return "Win7";
//       let isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
//       if (isWin10) return "Win10";
//   }
//   return "other";
// }

// export const beautifyConsole = (function(originFun) {
//   const headStyle = [
//     `font-family: "Microsoft YaHei", Arial, freesans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";`,
//     'color:white;',
//     'font-size:12px;',
//     'maring:5px 0;',
//     'background:yellowgreen;'
//   ]
//   const style = ['color:black;', 'font-size:12px;']
//   // console.log(style.join(''))
//   return function(head:string, message:string) {
//     originFun.call(
//       originFun,
//       `%c ${head} %c ${message}`,
//       headStyle.join(''),
//       style.join('')
//     )
//   }
// })(console.log)