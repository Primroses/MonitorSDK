import { useQuery } from "../middleware/collection";
import Data from "../bean/data";

export async function errorController(params: Data) {
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
    data,
    tableName,
  } = params;
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
    '${data.replace(/\'/g,"\"")}'
  )`;
  console.log(sql);
  try {
    await useQuery(sql);
  } catch (error) {
    console.log(error);
  }
}
