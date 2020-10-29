"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackController = void 0;
const collection_1 = require("../middleware/collection");
async function trackController(data) {
    const { appId, userId, apiVersion, appVersion, currentUrl, ua, type, os, mainType, pageHeight, pageWidth, screenHeight, screenWidth, refererUrl, timeStamp, trackId, trackContent, trackTarget, trackType, requestType, init, input, body, url, method, routeType, routeData, title, } = data;
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
      '${trackContent}',
      '${trackTarget}',
      '${trackType}'
    )`;
    }
    else if (mainType === "REQUEST") {
        if (requestType === "AJAX") {
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
      body,
      url,
      method,
      requestType
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
      '${body}',
      '${url}',
      '${method}',
      '${requestType}'
    )`;
        }
        else if (requestType === "FETCH") {
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
        init,
        input,
        requestType
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
        '${init}',
        '${input}',
        '${requestType}'
      )`;
        }
    }
    else if (routeType) {
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
      routeType,
      routeData,
      title
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
      '${routeType}',
      '${routeData}',
      '${title}'
    )`;
    }
    console.log(sql);
    try {
        await collection_1.useQuery(sql);
    }
    catch (error) {
        console.log(error);
    }
}
exports.trackController = trackController;
