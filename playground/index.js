(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.index = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function getBrowserInfo() {
        var inBrowser = typeof window !== "undefined";
        var ua = inBrowser && window.navigator.userAgent.toLowerCase();
        var isIE = ua && /msie|trident/.test(ua);
        var isEdge = ua && ua.indexOf("edge/") > 0;
        var isChrome = ua && /chrome\/\d+/.test(ua) && !isEdge;
        var isOpera = ua && (ua.indexOf("opera") > -1 || ua.indexOf("opr") > -1);
        var isSafari = ua && ua.indexOf("safari") > -1 && ua.indexOf("chrome") === -1;
        var isQQ = ua && ua.indexOf("mqqbrowser") > 0;
        var isFF = ua && ua.indexOf("firefox") > -1;
        var isUC = ua && ua.indexOf("ucbrowser/") > 0;
        var isBaidu = ua && ua.indexOf("baiduboxapp") > 0;
        var isAndroid = ua && ua.indexOf("android") > 0;
        var isIOS = ua && /iphone|ipad|ipod|ios/.test(ua);
        var BrowerTypeArr = [
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
        var BrowerRetArr = [
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
        ].map(function (val) {
            return {
                type: val,
                ua: ua,
            };
        });
        var index = BrowerTypeArr.map(function (val, index) {
            if (val) {
                return index;
            }
        }).filter(Boolean)[0];
        return BrowerRetArr[index] ? BrowerRetArr[index] : { type: "unknow", ua: ua };
    }
    function getOSInfo() {
        var sUserAgent = navigator.userAgent;
        var isWin = navigator.platform == "Win32" || navigator.platform == "Windows";
        var isMac = navigator.platform == "Mac68K" ||
            navigator.platform == "MacPPC" ||
            navigator.platform == "Macintosh" ||
            navigator.platform == "MacIntel";
        if (isMac)
            return "Mac";
        var isUnix = navigator.platform == "X11" && !isWin && !isMac;
        if (isUnix)
            return "Unix";
        var isLinux = String(navigator.platform).indexOf("Linux") > -1;
        if (isLinux)
            return "Linux";
        if (isWin) {
            var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 ||
                sUserAgent.indexOf("Windows 2000") > -1;
            if (isWin2K)
                return "Win2000";
            var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 ||
                sUserAgent.indexOf("Windows XP") > -1;
            if (isWinXP)
                return "WinXP";
            var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 ||
                sUserAgent.indexOf("Windows 2003") > -1;
            if (isWin2003)
                return "Win2003";
            var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 ||
                sUserAgent.indexOf("Windows Vista") > -1;
            if (isWinVista)
                return "WinVista";
            var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 ||
                sUserAgent.indexOf("Windows 7") > -1;
            if (isWin7)
                return "Win7";
            var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 ||
                sUserAgent.indexOf("Windows 10") > -1;
            if (isWin10)
                return "Win10";
        }
        return "other";
    }
    var beautifyConsole = (function (originFun) {
        var headStyle = [
            "font-family: \"Microsoft YaHei\", Arial, freesans, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";",
            "color:white;",
            "font-size:12px;",
            "maring:5px 0;",
            "background:yellowgreen;",
        ];
        var style = ["color:black;", "font-size:12px;"];
        return function (head, message) {
            originFun.call(originFun, "%c " + head + " %c " + message, headStyle.join(""), style.join(""));
        };
    })(console.log);
    function getPageInfo() {
        return {
            pageWidth: document.body.clientWidth,
            pageHeight: document.body.clientHeight,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
        };
    }
    function deepClone(obj, map) {
        if (map === void 0) { map = new Map(); }
        if (typeof obj != "object") {
            return;
        }
        if (map.has(obj))
            return map.get(obj);
        var _obj = Array.isArray(obj) ? [] : {};
        map.set(obj, _obj);
        for (var key in obj) {
            _obj[key] =
                typeof obj[key] === "object" ? deepClone(obj[key], map) : obj[key];
        }
        return _obj;
    }
    function genNonDuplicateID() {
        var idStr = Date.now().toString(36);
        idStr += Math.random().toString(36).substr(3);
        return idStr;
    }

    function patchConsole(context) {
        var ConsolesMap = ["error", "warn"];
        ConsolesMap.forEach(function (val) {
            var originConsoleFun = console[val];
            console[val] = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                var data = Object.assign(context.data(), {
                    timeStamp: new Date().toString(),
                    mainType: "CONSOLE",
                    data: {
                        message: message,
                    },
                    pageInfo: getPageInfo(),
                    currentUrl: window.location.href,
                    refererUrl: document.referrer || "/",
                });
                context.worker.add("indexDB", {
                    operatorType: "add",
                    tableName: "error",
                    data: data,
                });
                return originConsoleFun.call.apply(originConsoleFun, __spread([originConsoleFun,
                    message], optionalParams));
            };
        });
    }

    function patchError(context) {
        window.addEventListener("error", function (e) {
            var params;
            if (!e.cancelable) {
                var _a = e.target, localName = _a.localName, href = _a.href, src = _a.src;
                var sourceUrl = "";
                if (localName === "link") {
                    sourceUrl = href;
                }
                else {
                    sourceUrl = src;
                }
                params = {
                    resourceType: localName,
                    sourceUrl: sourceUrl,
                };
            }
            else {
                var lineno = e.lineno, filename = e.filename, timeStamp = e.timeStamp, error = e.error;
                var message = error ? error.message : e.message;
                var stack = error ? error.stack : "";
                params = {
                    lineno: lineno,
                    filename: filename,
                    message: message,
                    stack: stack,
                };
            }
            var data = Object.assign(context.data(), {
                timeStamp: new Date().toString(),
                mainType: params.resourceType ? "RESOURCE" : "ERROR",
                data: params,
                pageInfo: getPageInfo(),
                currentUrl: window.location.href,
                refererUrl: document.referrer || "/",
            });
            context.request(__assign(__assign({}, data), { tableName: "error" }), "/error");
        }, true);
    }

    function patchEvent(context) {
        var eventMaps = [
            "click",
            "input",
        ];
        var trackTarget = function (tagName, id, className) {
            if (!className) {
                return tagName.toLowerCase() + "#" + id;
            }
            else if (!id) {
                return tagName.toLowerCase() + "." + className.split(" ").join(".");
            }
            else if (!id && !className) {
                return "" + tagName.toLowerCase();
            }
            return "[" + tagName.toLowerCase() + "][id=" + id + "][class=" + className.split(" ") + "]";
        };
        eventMaps.forEach(function (val) {
            window.addEventListener(val, function (e) {
                var _a = e.target, tagName = _a.tagName, id = _a.id, className = _a.className, outerHTML = _a.outerHTML;
                if (tagName != "HTML") {
                    var params = {
                        trackTarget: trackTarget(tagName, id, className),
                        trackType: e.type,
                        trackContent: outerHTML,
                    };
                    var data = Object.assign(context.data(), {
                        timeStamp: new Date().toString(),
                        mainType: "EVENT",
                        data: params,
                        pageInfo: getPageInfo(),
                        currentUrl: window.location.href,
                        refererUrl: document.referrer || "/",
                    });
                    context.worker.add("indexDB", {
                        operatorType: "add",
                        tableName: "track",
                        data: data,
                    });
                }
            });
        }, true);
    }

    function patchPromise(context) {
        window.addEventListener("unhandledrejection", function (e) {
            var reason = e.reason;
            var params = {
                reason: reason,
            };
            var data = Object.assign(context.data(), {
                timeStamp: new Date(),
                mainType: "PROMISE",
                data: {
                    reason: params.reason,
                },
                pageInfo: getPageInfo(),
                currentUrl: window.location.href,
                refererUrl: document.referrer || "/",
            });
            context.request(__assign(__assign({}, data), { tableName: "error" }), "/error");
        });
    }

    function patchRequest(context) {
        patchAjax(context);
        patchFetch(context);
    }
    function patchAjax(context) {
        var filterUrl = ["login", "register"];
        var currentTime = 0;
        var dataMap = new Map();
        var originOpen = XMLHttpRequest.prototype.open;
        var originSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.open = function (method, url) {
            if (filterUrl.indexOf(url) < 0) {
                var params = {
                    method: method,
                    url: url,
                };
                dataMap.set(currentTime, params);
            }
            return originOpen && originOpen.call(this, method, url);
        };
        XMLHttpRequest.prototype.send = function (body) {
            var params = dataMap.get(currentTime);
            var data = Object.assign(context.data(), {
                timeStamp: new Date(),
                mainType: "REQUEST",
                data: __assign(__assign({}, params), { body: body, requestType: "AJAX" }),
                pageInfo: getPageInfo(),
                currentUrl: window.location.href,
                refererUrl: document.referrer || "/",
            });
            context.worker.add("indexDB", {
                operatorType: "add",
                tableName: "track",
                data: data,
            });
            currentTime += 1;
            return originSend && originSend.call(this, body);
        };
    }
    function patchFetch(context) {
        var _this = this;
        var originFetch = window.fetch;
        window.fetch = function (input, init) {
            var data = Object.assign(context.data(), {
                timeStamp: new Date(),
                mainType: "REQUEST",
                data: {
                    input: input,
                    init: JSON.stringify(init),
                    requestType: "FETCH",
                },
                pageInfo: getPageInfo(),
                currentUrl: window.location.href,
                refererUrl: document.referrer || "/",
            });
            context.worker.add("indexDB", {
                operatorType: "add",
                tableName: "track",
                data: data,
            });
            return originFetch && originFetch.call(_this, input, init);
        };
    }

    function patchRoute(context) {
        patchHistory(context);
        patchHash(context);
    }
    function patchHistory(context) {
        var historyFun = ["pushState", "replaceState"];
        historyFun.forEach(function (val) {
            var originHistoryFun = window.history[val];
            window.history[val] = function (data, title, url) {
                var historyData = Object.assign(context.data(), {
                    timeStamp: new Date().toString(),
                    mainType: "ROUTE",
                    data: {
                        routeData: JSON.stringify(data),
                        title: title,
                        url: url,
                        routeType: val,
                    },
                    pageInfo: getPageInfo(),
                    currentUrl: window.location.href,
                    refererUrl: document.referrer || "/",
                });
                context.worker.add("indexDB", {
                    operatorType: "add",
                    tableName: "track",
                    data: historyData,
                });
                return originHistoryFun && originHistoryFun.call(this, data, title, url);
            };
        });
    }
    function patchHash(context) {
        var originHashChange = window.onhashchange;
        window.onhashchange = function (event) {
            var url = "/" + window.location.hash.substr(1);
            var data = Object.assign(context.data(), {
                timeStamp: new Date().toString(),
                mainType: "ROUTE",
                data: {
                    url: url,
                    routeType: "Hash",
                },
                pageInfo: getPageInfo(),
                currentUrl: window.location.href,
                refererUrl: document.referrer || "/",
            });
            context.worker.add("indexDB", {
                operatorType: "add",
                tableName: "track",
                data: data,
            });
            return originHashChange && originHashChange.call(this, event);
        };
    }

    function patchPerformace(context) {
    }

    function warpPatch(context) {
        return __awaiter(this, void 0, void 0, function () {
            var nativeWindowEventListener;
            return __generator(this, function (_a) {
                nativeWindowEventListener = window.addEventListener;
                window.addEventListener = function (type, func, options) {
                    var wrappedFunc = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        try {
                            return func.apply(this, args);
                        }
                        catch (e) {
                            if (e) {
                                var data = Object.assign(context.data(), {
                                    timeStamp: new Date().toString(),
                                    mainType: "EVENTLISTENER",
                                    data: {
                                        message: e.message,
                                        stack: e.stack,
                                    },
                                    pageInfo: getPageInfo(),
                                    currentUrl: window.location.href,
                                    refererUrl: document.referrer || "/",
                                    eventType: e.name,
                                });
                                context.worker.add("indexDB", {
                                    operatorType: "add",
                                    tableName: "error",
                                    data: data,
                                });
                            }
                        }
                    };
                    return nativeWindowEventListener.call(this, type, wrappedFunc, options);
                };
                return [2];
            });
        });
    }

    function useRequest(url) {
        var request = new Image(1, 1);
        request.src = url;
    }
    function getRequsetUrl(data, url) {
        var dataStr = url + "/abc.jpg" + "?" + "";
        function getDataStr(currentData) {
            Object.keys(currentData).forEach(function (val) {
                if (Object.prototype.toString.call(currentData[val]) === "[object Object]") {
                    getDataStr(currentData[val]);
                }
                else {
                    dataStr += val + "=" + currentData[val] + "&";
                }
            });
        }
        getDataStr(data);
        dataStr = dataStr.substring(dataStr.lastIndexOf("&"), -1);
        return dataStr;
    }

    var DB = (function () {
        function DB(databaseName, version) {
            if (version === void 0) { version = 1.0; }
            var that = this;
            this.DBRequest = indexedDB.open(databaseName, version);
            this.transactionList = [];
            this.DBRequest.onerror = function () {
            };
            this.DBRequest.onsuccess = function () {
                that.transactionList.forEach(function (val) { return val(that.DBRequest.result); });
            };
            this.DBRequest.onupgradeneeded = function (event) {
                var currentDB = event.target.result;
                if (!currentDB.objectStoreNames.contains("error")) {
                    var objectStore = currentDB.createObjectStore("error", {
                        keyPath: "errorId",
                        autoIncrement: true,
                    });
                    objectStore.createIndex("mainType", "mainType");
                }
                if (!currentDB.objectStoreNames.contains("track")) {
                    var objectStore = currentDB.createObjectStore("track", {
                        keyPath: "pathId",
                        autoIncrement: true,
                    });
                    objectStore.createIndex("mainType", "mainType");
                }
            };
        }
        DB.prototype.DBResolve = function () {
            var that = this;
            return new Promise(function (resolve, reject) {
                that.DBRequest.addEventListener("success", function () {
                    resolve(that.DBRequest.result);
                });
            });
        };
        DB.prototype.add = function (DBRequest, tableName, data) {
            return __awaiter(this, void 0, void 0, function () {
                var request;
                return __generator(this, function (_a) {
                    request = DBRequest.transaction([tableName], "readwrite")
                        .objectStore(tableName)
                        .add(data);
                    return [2, new Promise(function (resolve, reject) {
                            request.addEventListener("success", function (event) {
                                resolve(event);
                            });
                            request.addEventListener("error", function (event) {
                                reject(event);
                            });
                        })];
                });
            });
        };
        DB.prototype.read = function (DBRequest, tableName, mainType) {
            return __awaiter(this, void 0, void 0, function () {
                var result, objectStore, indexRequest_1;
                return __generator(this, function (_a) {
                    result = [];
                    objectStore = DBRequest.transaction([tableName]).objectStore(tableName);
                    if (mainType) {
                        indexRequest_1 = objectStore.index("mainType").get(mainType);
                        return [2, new Promise(function (resolve, reject) {
                                indexRequest_1.addEventListener("success", function (event) {
                                    var cursor = event.target.result;
                                    resolve(cursor);
                                });
                                objectStore.openCursor().addEventListener("error", function (event) {
                                    reject(event);
                                });
                            })];
                    }
                    else {
                        return [2, new Promise(function (resolve, reject) {
                                objectStore
                                    .openCursor()
                                    .addEventListener("success", function (event) {
                                    var cursor = event.target.result;
                                    if (cursor) {
                                        result.push(cursor.value);
                                        cursor.continue();
                                    }
                                    else {
                                        resolve(result);
                                    }
                                });
                                objectStore.openCursor().addEventListener("error", function (event) {
                                    reject(event);
                                });
                            })];
                    }
                });
            });
        };
        DB.prototype.clear = function (DBRequest, tableName) {
            return __awaiter(this, void 0, void 0, function () {
                var objectStore;
                return __generator(this, function (_a) {
                    objectStore = DBRequest.transaction([tableName], "readwrite").objectStore(tableName);
                    return [2, new Promise(function (resolve) {
                            var ret = objectStore.clear();
                            resolve(ret);
                        })];
                });
            });
        };
        return DB;
    }());

    var Data = (function () {
        function Data(options) {
            this.userId = options.userId;
            this.trackId = options.trackId;
            this.timeStamp = options.timeStamp;
            this.mainType = options.mainType;
            this.device = options.device;
            this.currentUrl = options.currentUrl;
            this.refererUrl = options.refererUrl;
            this.pageInfo = options.pageInfo;
            this.appVersion = options.appVersion;
            this.apiVersion = options.apiVersion;
            this.appId = options.appId;
        }
        return Data;
    }());
    var ErrorData = (function (_super) {
        __extends(ErrorData, _super);
        function ErrorData(options) {
            var _this = _super.call(this, options) || this;
            _this.data = options.data;
            return _this;
        }
        return ErrorData;
    }(Data));
    var TrackData = (function (_super) {
        __extends(TrackData, _super);
        function TrackData(options) {
            var _this = _super.call(this, options) || this;
            _this.data = options.data;
            return _this;
        }
        return TrackData;
    }(Data));

    var Store = (function () {
        function Store() {
        }
        Store.prototype.remove = function (key) {
            localStorage.removeItem(key);
        };
        Store.prototype.set = function (key, value) {
            localStorage.setItem(key, value);
        };
        Store.prototype.get = function (key) {
            return localStorage.getItem(key);
        };
        return Store;
    }());

    var InitWorker = (function () {
        function InitWorker() {
            this.worker = new Worker("../worker.js");
            this.messageQuene = [];
            this.store = new Store();
        }
        InitWorker.prototype.sentMessageToWorker = function (data) {
            var that = this;
            if (this.success) {
                if (this.messageQuene.length) {
                    this.messageQuene.forEach(function (val) {
                        that.worker.postMessage(JSON.stringify(val));
                    });
                    this.messageQuene = [];
                }
                that.worker.postMessage(JSON.stringify(data));
            }
            else {
                this.messageQuene.push(data);
            }
        };
        InitWorker.prototype.acceptMessageFromWorker = function (worker, req) {
            var _this = this;
            var that = this;
            this.worker.addEventListener("message", function (message) {
                var _a = JSON.parse(message.data), saveType = _a.saveType, acceptLastVisited = _a.acceptLastVisited, data = _a.data, tableName = _a.tableName, success = _a.success;
                if (success) {
                    _this.success = true;
                    var LastVisited = worker.store.get("LastVisited");
                    worker.sentMessageToWorker({
                        saveType: "store",
                        data: { LastVisited: LastVisited },
                    });
                }
                if (saveType === "store") {
                    that.store.set("LastVisited", acceptLastVisited);
                }
                else if (saveType === "indexDB") {
                    console.log(data, tableName);
                    req(__assign(__assign({}, data), { tableName: tableName }), "/error");
                }
            });
            this.worker.addEventListener("messageerror", function (message) { });
        };
        InitWorker.prototype.add = function (saveType, data) {
            this.sentMessageToWorker({ saveType: saveType, data: data });
        };
        InitWorker.prototype.read = function (saveType, data) {
            this.sentMessageToWorker({ saveType: saveType, data: data });
        };
        InitWorker.prototype.clear = function (saveType, data) {
            this.sentMessageToWorker({ saveType: saveType, data: data });
        };
        return InitWorker;
    }());
    var worker = new InitWorker();
    function workerMain(req) {
        worker.acceptMessageFromWorker(worker, req);
    }

    function initMonitor(options) {
        var db = new DB("monitor");
        var data = new Data({
            userId: "1345854620",
            trackId: genNonDuplicateID(),
            device: {
                os: getOSInfo(),
                browser: getBrowserInfo(),
            },
            appVersion: 1.0,
            apiVersion: 1.0,
            appId: 1.0,
        });
        var req = function (data, url) {
            var reqUrl = getRequsetUrl(data, "http://test.xiangyou.ouj.com:5000" + url);
            useRequest(reqUrl);
        };
        var context = {
            db: db,
            data: function () { return deepClone(data); },
            request: req,
            worker: worker,
        };
        workerMain(req);
        var patchFunction = [
            warpPatch,
            patchPerformace,
            patchConsole,
            patchError,
            patchEvent,
            patchPromise,
            patchRequest,
            patchRoute,
        ];
        for (var i = 0; i < patchFunction.length; i++) {
            patchFunction[i](context);
        }
        beautifyConsole("[ MonitorSDK ]", "Starting Monitor");
        return {
            req: req,
        };
    }

    exports.initMonitor = initMonitor;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
