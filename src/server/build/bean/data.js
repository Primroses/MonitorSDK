"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Data {
    constructor(options) {
        this.userId = options.userId;
        this.trackId = options.trackId;
        this.timeStamp = options.timeStamp;
        this.mainType = options.mainType;
        this.ua = options.ua;
        this.type = options.type;
        this.os = options.os;
        this.currentUrl = options.currentUrl;
        this.refererUrl = options.refererUrl;
        this.pageHeight = options.pageHeight;
        this.pageWidth = options.pageWidth;
        this.screenHeight = options.screenHeight;
        this.appVersion = options.appVersion;
        this.appId = options.appId;
        this.apiVersion = options.apiVersion;
        this.data = options.data;
        this.tableName = options.tableName;
    }
}
exports.default = Data;
