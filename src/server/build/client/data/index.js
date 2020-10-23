"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorData = exports.Data = void 0;
// 构建上报数据的基础原型
class Data {
    constructor(options) {
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
}
exports.Data = Data;
class ErrorData extends Data {
    constructor(options) {
        super(options);
        this.data = options.data;
    }
}
exports.ErrorData = ErrorData;
