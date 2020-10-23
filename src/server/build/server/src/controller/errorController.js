"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorController = void 0;
function errorController(data) {
    const { appId, userId, apiVersion, appVersion, currentUrl, ua, type, os, mainType, pageHeight, pageWidth, screenHeight, screenWidth, refererUrl, timeStamp, trackId, } = data;
    const sql = `insert into error(appId,
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
    )`;
}
exports.errorController = errorController;
