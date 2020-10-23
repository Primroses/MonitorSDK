"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorController = void 0;
const collection_1 = require("../middleware/collection");
async function errorController(data) {
    const { appId, userId, apiVersion, appVersion, currentUrl, ua, type, os, mainType, pageHeight, pageWidth, screenHeight, screenWidth, refererUrl, timeStamp, trackId, lineno, filename, message, stack, resourceType, sourceUrl, reason, } = data;
    let sql;
    if (mainType === "ERROR") {
        sql = `insert into error(appId,
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
      filename,
      lineno,
      message,
      stack
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
      '${filename}',
      '${lineno}',
      '${message}',
      '${stack}'
    )`;
    }
    else if (mainType === "RESOURCE") {
        sql = `insert into error(
      appId,
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
      resourceType,    
      sourceUrl
    ) value (
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
      '${resourceType}',
      '${sourceUrl}'
    )
    `;
    }
    else if (mainType === "PROMISE") {
        sql = `insert into error(
      appId,
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
      reason
    ) value (
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
      '${reason}'
    )
    `;
    }
    await collection_1.useQuery(sql);
}
exports.errorController = errorController;
