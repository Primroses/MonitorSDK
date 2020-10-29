(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

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

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
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

    var db = new DB("monitor");
    function cleanTable(DBRequest, tableName) {
        return __awaiter(this, void 0, void 0, function () {
            var data, map, map_1, map_1_1, _a, key, value, filterData, filterData_1, filterData_1_1, data_1, error_1;
            var e_1, _b, e_2, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4, db.read(DBRequest, tableName)];
                    case 1:
                        data = _d.sent();
                        return [4, db.clear(DBRequest, tableName)];
                    case 2:
                        _d.sent();
                        console.log("[Cleaned Table " + tableName + " ]");
                        map = divideDataToMap(data);
                        try {
                            for (map_1 = __values(map), map_1_1 = map_1.next(); !map_1_1.done; map_1_1 = map_1.next()) {
                                _a = __read(map_1_1.value, 2), key = _a[0], value = _a[1];
                                filterData = filterTable(value, key);
                                try {
                                    for (filterData_1 = (e_2 = void 0, __values(filterData)), filterData_1_1 = filterData_1.next(); !filterData_1_1.done; filterData_1_1 = filterData_1.next()) {
                                        data_1 = filterData_1_1.value;
                                        db.add(DBRequest, tableName, data_1);
                                        postMessage(JSON.stringify({ saveType: "indexDB", data: data_1, tableName: tableName }));
                                    }
                                }
                                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                finally {
                                    try {
                                        if (filterData_1_1 && !filterData_1_1.done && (_c = filterData_1.return)) _c.call(filterData_1);
                                    }
                                    finally { if (e_2) throw e_2.error; }
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (map_1_1 && !map_1_1.done && (_b = map_1.return)) _b.call(map_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [3, 4];
                    case 3:
                        error_1 = _d.sent();
                        console.error(error_1);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    }
    function divideDataToMap(data) {
        var e_3, _a;
        var divideMap = new Map();
        try {
            for (var data_2 = __values(data), data_2_1 = data_2.next(); !data_2_1.done; data_2_1 = data_2.next()) {
                var val = data_2_1.value;
                if (!divideMap.get(val.mainType)) {
                    var arr = [];
                    arr.push(val);
                    divideMap.set(val.mainType, arr);
                }
                else {
                    var arr = divideMap.get(val.mainType);
                    arr.push(val);
                    divideMap.set(val.mainType, arr);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (data_2_1 && !data_2_1.done && (_a = data_2.return)) _a.call(data_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return divideMap;
    }
    function filterTable(data, mainType) {
        var e_4, _a;
        if (!data.length) {
            return data;
        }
        var filterMap = new Map();
        var retData = [];
        data.forEach(function (val) {
            filterMap.set(JSON.stringify(val.data), val);
        });
        try {
            for (var filterMap_1 = __values(filterMap), filterMap_1_1 = filterMap_1.next(); !filterMap_1_1.done; filterMap_1_1 = filterMap_1.next()) {
                var _b = __read(filterMap_1_1.value, 2), value = _b[1];
                retData.push(value);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (filterMap_1_1 && !filterMap_1_1.done && (_a = filterMap_1.return)) _a.call(filterMap_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return retData;
    }
    function startCleanWorker(DBRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var cleanTables;
            return __generator(this, function (_a) {
                cleanTables = ["error", "track"];
                return [2, new Promise(function (resolve) {
                        for (var i = 0; i < cleanTables.length; i++) {
                            cleanTable(DBRequest, cleanTables[i]);
                        }
                        resolve(true);
                    })];
            });
        });
    }
    function main() {
        return __awaiter(this, void 0, void 0, function () {
            var DBRequest, TIMEGAP;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, db.DBResolve()];
                    case 1:
                        DBRequest = _a.sent();
                        TIMEGAP = 1000 * 60 * 60 * 24;
                        postMessage(JSON.stringify({ success: true }));
                        self.addEventListener("message", function (message) {
                            return __awaiter(this, void 0, void 0, function () {
                                var currentVisited, _a, saveType, data, operatorType, tableName;
                                return __generator(this, function (_b) {
                                    currentVisited = new Date().getTime();
                                    _a = JSON.parse(message.data), saveType = _a.saveType, data = _a.data;
                                    if (saveType === "store") {
                                        startCleanWorker(DBRequest);
                                        if (data.LastVisited === "undefined" ||
                                            currentVisited - parseInt(data.LastVisited) > TIMEGAP) {
                                            postMessage(JSON.stringify({
                                                saveType: "store",
                                                acceptLastVisited: currentVisited,
                                            }));
                                        }
                                    }
                                    else if (saveType === "indexDB") {
                                        operatorType = data.operatorType, tableName = data.tableName;
                                        console.log(data);
                                        db[operatorType](DBRequest, tableName, data.data);
                                    }
                                    return [2];
                                });
                            });
                        });
                        return [2];
                }
            });
        });
    }
    main();

})));
