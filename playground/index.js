!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e="undefined"!=typeof globalThis?globalThis:e||self).index={})}(this,function(e){"use strict";var t,r,o,f=(t=console.log,r=['font-family: "Microsoft YaHei", Arial, freesans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";',"color:white;","font-size:12px;","maring:5px 0;","background:yellowgreen;"],o=["color:black;","font-size:12px;"],function(e,n){t.call(t,"%c "+e+" %c "+n,r.join(""),o.join(""))});function l(){return{pageWidth:document.body.clientWidth,pageHeight:document.body.clientHeight,screenWidth:window.screen.width,screenHeight:window.screen.height}}var i=function(e,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t])})(e,n)};function n(i,a,s,c){return new(s=s||Promise)(function(e,n){function t(e){try{o(c.next(e))}catch(e){n(e)}}function r(e){try{o(c.throw(e))}catch(e){n(e)}}function o(n){n.done?e(n.value):new s(function(e){e(n.value)}).then(t,r)}o((c=c.apply(i,a||[])).next())})}function a(t,r){var o,i,a,e,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return e={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function n(n){return function(e){return function(n){if(o)throw new TypeError("Generator is already executing.");for(;s;)try{if(o=1,i&&(a=2&n[0]?i.return:n[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,n[1])).done)return a;switch(i=0,a&&(n=[2&n[0],a.value]),n[0]){case 0:case 1:a=n;break;case 4:return s.label++,{value:n[1],done:!1};case 5:s.label++,i=n[1],n=[0];continue;case 7:n=s.ops.pop(),s.trys.pop();continue;default:if(!(a=0<(a=s.trys).length&&a[a.length-1])&&(6===n[0]||2===n[0])){s=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){s.label=n[1];break}if(6===n[0]&&s.label<a[1]){s.label=a[1],a=n;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(n);break}a[2]&&s.ops.pop(),s.trys.pop();continue}n=r.call(t,s)}catch(e){n=[6,e],i=0}finally{o=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,e])}}}function d(e){this.userId=e.userId,this.trackId=e.trackId,this.timeStamp=e.timeStamp,this.mainType=e.mainType,this.device=e.device,this.currentUrl=e.currentUrl,this.refererUrl=e.refererUrl,this.pageInfo=e.pageInfo,this.appVersion=e.appVersion,this.apiVersion=e.apiVersion,this.appId=e.appId}var s,c,u,p=(h.prototype.DBResolve=function(){var t=this;return new Promise(function(e,n){t.DBRequest.addEventListener("success",function(){e(t.DBRequest.result)})})},h.prototype.add=function(t,o){return n(this,void 0,void 0,function(){var n,r;return a(this,function(e){switch(e.label){case 0:return[4,this.DBResolve()];case 1:return n=e.sent(),r=n.transaction([t],"readwrite").objectStore(t).add(o),[2,new Promise(function(n,t){r.addEventListener("success",function(e){n(e)}),r.addEventListener("error",function(e){t(e)})})]}})})},h.prototype.read=function(t){return n(this,void 0,void 0,function(){var r,n,o;return a(this,function(e){switch(e.label){case 0:return r=[],[4,this.DBResolve()];case 1:return n=e.sent(),o=n.transaction([t]).objectStore(t),[2,new Promise(function(t,n){o.openCursor().addEventListener("success",function(e){var n=e.target.result;n?(r.push(n.value),n.continue()):t(r)}),o.openCursor().addEventListener("error",function(e){n(e)})})]}})})},h.prototype.clear=function(t){return n(this,void 0,void 0,function(){var n,r;return a(this,function(e){switch(e.label){case 0:return[4,this.DBResolve()];case 1:return n=e.sent(),r=n.transaction([t],"readwrite").objectStore(t),[2,new Promise(function(e,n){var t=r.clear();console.log(t,"RET_____"),e(t)})]}})})},h);function h(e,n){void 0===n&&(n=1);var t=this;this.DBRequest=indexedDB.open(e,n),this.transactionList=[],this.DBRequest.onerror=function(){},this.DBRequest.onsuccess=function(){t.transactionList.forEach(function(e){return e(t.DBRequest.result)})},this.DBRequest.onupgradeneeded=function(e){var n=e.target.result;n.objectStoreNames.contains("error")||n.createObjectStore("error",{keyPath:"errorId",autoIncrement:!0})}}function w(){this.constructor=c}function v(e){var n=new p("monitor");new Worker("../worker.js");var t,r,o,i,a,s,c=new d({userId:"1345854620",trackId:(s=Date.now().toString(36),s+=Math.random().toString(36).substr(3)),device:{os:function(){var e=navigator.userAgent,n="Win32"==navigator.platform||"Windows"==navigator.platform,t="Mac68K"==navigator.platform||"MacPPC"==navigator.platform||"Macintosh"==navigator.platform||"MacIntel"==navigator.platform;if(t)return"Mac";if("X11"==navigator.platform&&!n&&!t)return"Unix";if(-1<String(navigator.platform).indexOf("Linux"))return"Linux";if(n){if(-1<e.indexOf("Windows NT 5.0")||-1<e.indexOf("Windows 2000"))return"Win2000";if(-1<e.indexOf("Windows NT 5.1")||-1<e.indexOf("Windows XP"))return"WinXP";if(-1<e.indexOf("Windows NT 5.2")||-1<e.indexOf("Windows 2003"))return"Win2003";if(-1<e.indexOf("Windows NT 6.0")||-1<e.indexOf("Windows Vista"))return"WinVista";if(-1<e.indexOf("Windows NT 6.1")||-1<e.indexOf("Windows 7"))return"Win7";if(-1<e.indexOf("Windows NT 10")||-1<e.indexOf("Windows 10"))return"Win10"}return"other"}(),browser:(o=[(t="undefined"!=typeof window&&window.navigator.userAgent.toLowerCase())&&/msie|trident/.test(t),r=t&&0<t.indexOf("edge/"),t&&/chrome\/\d+/.test(t)&&!r,t&&(-1<t.indexOf("opera")||-1<t.indexOf("opr")),t&&-1<t.indexOf("safari")&&-1===t.indexOf("chrome"),t&&0<t.indexOf("mqqbrowser"),t&&-1<t.indexOf("firefox"),t&&0<t.indexOf("ucbrowser/"),t&&0<t.indexOf("baiduboxapp"),t&&0<t.indexOf("android"),t&&/iphone|ipad|ipod|ios/.test(t)],(i=["IE","Edge","Chrome","Opera","Safari","QQ","FF","UC","Baidu","Android","IOS"].map(function(e){return{type:e,ua:t}}))[a=o.map(function(e,n){if(e)return n}).filter(Boolean)[0]]?i[a]:{type:"unknow",ua:t})},appVersion:1,apiVersion:1,appId:1}),u={db:n,data:function(){return function e(n,t){if(void 0===t&&(t=new Map),"object"==typeof n){if(t.has(n))return t.get(n);var r=Array.isArray(n)?[]:{};for(var o in t.set(n,r),n)r[o]="object"==typeof n[o]?e(n[o],t):n[o];return r}}(c)},request:function(e,n){var t,r;r="http://test.xiangyou.ouj.com:5000"+n+"/abc.jpg?",function n(t){Object.keys(t).forEach(function(e){"[object Object]"===Object.prototype.toString.call(t[e])?n(t[e]):r+=e+"="+t[e]+"&"})}(e),t=r=r.substring(r.lastIndexOf("&"),-1),new Image(1,1).src=t}};[function(o){var t=window.addEventListener;window.addEventListener=function(e,r,n){return t.call(this,e,function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return r.apply(this,e)}catch(e){console.dir(e);var t=Object.assign(o.data(),{timeStamp:(new Date).toString(),mainType:"EVENTLISTENER",data:e,pageInfo:l(),currentUrl:window.location.href,refererUrl:document.referrer,eventType:e.name});o.db.add("error",t)}},n)}},function(e){var n=console.error;console.error=function(e){return console.log(e),n.call(this,arguments)}},function(d){window.addEventListener("error",function(e){var n;if(e.cancelable){var t=e.lineno,r=e.filename,o=e.timeStamp,i=e.error;n={lineno:t,filename:r,timeStamp:o,message:i?i.message:e.message,stack:i?i.stack:""}}else{var a=e.target,s=a.localName,c=a.href,u=a.src;n={resourceType:s,sourceUrl:"link"===s?c:u}}var f=Object.assign(d.data(),{timeStamp:(new Date).toString(),mainType:n.resourceType?"RESOURCE":"ERROR",data:n,pageInfo:l(),currentUrl:window.location.href,refererUrl:document.referrer});throw d.request(f,"/error"),new Error("Test Error")},!0)},function(e){},function(r){window.addEventListener("unhandledrejection",function(e){var n={reason:e.reason,timeStamp:e.timeStamp},t=Object.assign(r.data(),{timeStamp:(new Date).toString(),mainType:"PROMISE",data:n,pageInfo:l(),currentUrl:window.location.href,refererUrl:document.referrer});throw r.request(t,"/error"),new Error("Test Promised")})},function(e){},function(e){}].forEach(function(e){e(u)}),f("[ MonitorSDK ]","Starting Monitor")}i(c=function(e){var n=s.call(this,e)||this;return n.data=e.data,n},u=s=d),c.prototype=null===u?Object.create(u):(w.prototype=u.prototype,new w),v(),e.initMonitor=v,Object.defineProperty(e,"__esModule",{value:!0})});
