import { useQuery } from "../middleware/collection";

interface ErrorData {
  userId: string; // 用户的唯一标识

  trackId: string; // 错误发生过后的唯一标识该错误的Id

  timeStamp?: string; // 当前发生错误时间的时间撮

  // 需要两个类型进行 定位索引?
  mainType?:
    | "ERROR"
    | "PROMISE"
    | "AJAX"
    | "RESOURCE"
    | "TRACK"
    | "EVENT"
    | "PERFORMANCE"; // 上报数据的类型(主要的)

  // private minorType:MinorDataType; // 次要类型

  ua: string;
  type: string;
  os: string; // 操作硬件的信息

  currentUrl?: string; // 当前所处的Url

  refererUrl?: string; // 是从什么来源 到什么来源的

  pageHeight: number;
  pageWidth: number;
  screenHeight: number;
  screenWidth: number; // 当前页面的信息
  // 各类数据类型
  appVersion: number;

  apiVersion: number;

  appId: number;

  lineno: string;
  filename: string;
  message: string;
  stack: string;

  resourceType: string;
  sourceUrl: string;

  reason: string;
}

export async function errorController(data: ErrorData) {
  const {
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

    lineno,
    filename,
    message,
    stack,

    resourceType,
    sourceUrl,

    reason,
  } = data;
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
      "${message}",
      "${stack}"
    )`;
  } else if (mainType === "RESOURCE") {
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
  } else if (mainType === "PROMISE") {
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
      "${reason}"
    )
    `;
  }
  console.log(sql);
  // await useQuery(sql);
}
