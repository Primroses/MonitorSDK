"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorController = void 0;
const collection_1 = require("../middleware/collection");
async function errorController(params) {
    const { appId, userId, apiVersion, appVersion, currentUrl, ua, type, os, mainType, pageHeight, pageWidth, screenHeight, screenWidth, refererUrl, timeStamp, trackId, data, tableName, } = params;
    const sql = `insert into ${tableName}(appId,
    userId,
    apiVersion,
    appVersion,
    currentUrl,
    ua,
    type,
    os,
    mainType,
    pageHeight,
    pageWidth,
    screenHeight,
    screenWidth,
    refererUrl,
    timeStamp,
    trackId,
    data
  ) values (
    '${appId}',
    '${userId}',
    '${apiVersion}',
    '${appVersion}',
    '${currentUrl}',
    '${ua}',
    '${type}',
    '${os}',
    '${mainType}',
    '${pageHeight}',
    '${pageWidth}',
    '${screenHeight}',
    '${screenWidth}',
    '${refererUrl}',
    '${timeStamp}',
    '${trackId}',
    '${data.replace(/\'/g, "\"")}'
  )`;
    console.log(sql);
    try {
        await collection_1.useQuery(sql);
    }
    catch (error) {
        console.log(error);
    }
}
exports.errorController = errorController;
