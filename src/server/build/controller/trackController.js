"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackController = void 0;
const collection_1 = require("../middleware/collection");
async function trackController(data) {
    const { appId, userId, apiVersion, appVersion, currentUrl, ua, type, os, mainType, pageHeight, pageWidth, screenHeight, screenWidth, refererUrl, timeStamp, trackId, offsetX, offsetY, trackContent, trackTarget, trackType, } = data;
    let sql;
    if (mainType === "EVENT") {
        sql = `insert into track(
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
      offsetX,
      offsetY,
      trackContent,
      trackTarget,
      trackType
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
      '${offsetX}',
      '${offsetY}',
      '${trackContent}',
      '${trackTarget}',
      '${trackType}'
    )`;
    }
    // console.log(sql);
    try {
        await collection_1.useQuery(sql);
    }
    catch (error) {
        console.log(error);
    }
}
exports.trackController = trackController;
