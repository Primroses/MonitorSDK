import { useQuery } from "../middleware/collection";

interface TrackData {
  userId: string; // 用户的唯一标识

  trackId: string; // 错误发生过后的唯一标识该错误的Id

  timeStamp?: string; // 当前发生错误时间的时间撮

  // 需要两个类型进行 定位索引?
  mainType?: "EVENT";

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

  offsetX: number;
  offsetY: number;
  trackContent: string;
  trackTarget: string;
  trackType: string;
}

export async function trackController(data: TrackData) {
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
    offsetX,
    offsetY,
    trackContent,
    trackTarget,
    trackType,
  } = data;
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
    await useQuery(sql);
  } catch (error) {
    console.log(error);
  }
}
