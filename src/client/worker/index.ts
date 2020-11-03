import { beautifyConsole } from "./../utils/index";
import DB from "../data/dataBase";
import { Data } from "../data/index";

// 这里是做数据清洗的 因为可能会多次触发同一次事件

// errorId 和 trackId 的思考
// 主要是记录本次的 track路径 方便后续 可以还原 该用户的一些操作
// trackId  应该是用户这一次 登录 应用中 所操作的所有 而不是每次都增长 所以trackId 是 贮藏在内存中 每次 进入应用就应该自动生成的Id
// 因为每个用户都不一样 生成的 trackId 也应该不一样 需要一个生成trackId的库? 当前请求的时间 混合的算法?
// errorId 才是每次都自动增长

// 第一 怎么去 生成一个 trackId / errorId 这样 唯一标识这一次是 一个 连串事件

// 第二 清洗的是什么数据 ，多余的数据。即用户多次 触发的 无用数据 ，虽然都记录在 数据库中 但是不需要全部都上传的 服务器资源。

// 第三 worker 是一个 定时任务 清洗数据 LRU

const db = new DB("monitor"); // worker 跟 主线程的db Request 是不同的 所以 得重新初始化

// 这里先清洗数据 清洗的目的是 先把所有的表格 数据 都拿出来 后再进行 清洗
// 清洗的是 多次 重复性数据 感觉 可以 LRU.... (LRU 也是 清洗的一部分 保证里面只有一条....)

// 客户端和 服务端的清理是不一样的? 客户端 尽量保证 数据的 单一性 ，重复性数据 尽量 不出现
// 服务端 是清理 不同用户的数据 如果 多个用户同时 出现 相同的问题 就得 注意了....

// 但是LRU 有一个问题就是 假如那人 首页 -> 详情页 -> 首页 -> 详情页 这样的话 存储的情况就是 详情页 在栈顶了 违反了 一些 正常逻辑...

// 还先不能考虑 小程序 。小程序 不知道支不支持 web worker

// async await 和 promise 的小问题，await 是要await 一个值 ，如果函数里面返回没有值 就不会await  直接执行?

/**
 *
 * @param {IDBDatabase} DBRequest
 * @param {string} tableName
 */
async function cleanTable(DBRequest: IDBDatabase, tableName: TableName) {
  // 我觉得 error 里面就应该存在那种 patch Function中出现的问题 。正常的error 都应该直接上报的
  // 定时清理 但是 应该要的是LRU 才对的 翻转过来 的 LRU 好像有点扯?
  // 这种错误 直接过滤成

  // 读取的时候就的知道是什么mainType 所以得把mainType 跟 表名 先列出来
  try {
    const data = await db.read(DBRequest, tableName);
    await db.clear(DBRequest, tableName); // 然后清除表
    console.log("[Cleaned Table " + tableName + " ]");
    const map = divideDataToMap(data);
    const afterFilterData = [];
    for (let [key, value] of map) {
      // 清理过后的数据
      const filterData = filterTable(value);
      afterFilterData.push(filterData);
      // for (let data of filterData) {
      //    db.add(DBRequest, tableName, data); // 感觉就不用插回去了
      //    这里有一个整合 假如这里很多条数据 就会占用很多次的请求 感觉性能会不太好 我们应该是在空闲的时候发送，或者是关闭浏览器的时候发送
      //    postMessage(JSON.stringify({ saveType: "indexDB", data, tableName }));
      // }
    }
    return afterFilterData;
  } catch (error) {
    // 后面自己在捕获一手?
    console.error(error);
  }
  // 弄完最后再清理
}

/**
 * 根据mainType来区分数据
 * mainType 存在Data里面 所以直接遍历data 就可以了..
 * @param {Data[]} data
 * @returns
 */
function divideDataToMap(data: Data[]) {
  const divideMap = new Map<MainDataType, Data[]>();
  for (let val of data) {
    if (!divideMap.get(val.mainType)) {
      const arr: Data[] = [];
      arr.push(val);
      divideMap.set(val.mainType, arr);
    } else {
      const arr = divideMap.get(val.mainType);
      arr.push(val);
      divideMap.set(val.mainType, arr);
    }
  }
  return divideMap;
}

/**
 *
 * @param {Data[]} data
 * @param {MainDataType} mainType
 * @returns {Data[]}
 */
function filterTable(data: Data[]): Data[] {
  // 刚开始或者是 别的 错手删掉的时候 就直接返回
  if (!data.length) {
    return data;
  }
  // 存在 error 中的数据 mainType有 CONSOLE  / ERROR RESOURSE PROMISE 直接上传 不需要过滤
  // CONSOLE -> message

  // 第一次是用数组进行 LRU 后来发现 如果一个MainType 里面有多个 就无法这样做了 只能用 map 来做
  // LRU 是 基本数据类型的值都可以用数组来做 但是 如果是map 就不行了....

  // 超级简单的 LRU 就是用一个map 疯狂的重复赋值?
  const filterMap = new Map<string, Data>();
  const retData: Data[] = [];
  // 这个逼 不知道自己是什么类型
  data.forEach((val) => {
    filterMap.set(val.data, val);
  });
  for (let [, value] of filterMap) {
    retData.push(value);
  }
  return retData;
}

/**
 * 启动清除的 worker
 *
 * @param {IDBDatabase} DBRequest
 * @returns
 */
async function startCleanWorker(DBRequest: IDBDatabase) {
  const cleanTables: TableName[] = ["error", "track", "performance"];
  const allAfterCleanData: Data[][] = [];
  for (let i = 0; i < cleanTables.length; i++) {
    // for 循环 不会并行 而是串行?
    const afterCleanData = await cleanTable(DBRequest, cleanTables[i]);
    allAfterCleanData.push(...afterCleanData);
  }
  postMessage(JSON.stringify({ data: allAfterCleanData, saveType: "indexDB" }));
}

// 前端定时任务? 是不是得 通过localstroage 来实现呢? 而且还是不太标准的定时任务?
// 不可能每天都打开你的 网页吧? 还是得hack 一手
// startWorker();
// main 入口
// worker 是主要的桥梁 跟 indexDB 做交互的

export async function main() {
  const DBRequest = await db.DBResolve();
  const TIMEGAP = 1000 * 60 * 60 * 24; // 一天差距 多少天上传一次
  beautifyConsole("[Monitor SDK]", "Worker start");
  // 这里得调整一下 因为 有一个异步的原因 。当你的异步回来以后 可能后面的没有监听到 或者是没有执行 就比较拉胯
  // 这里得有一个 message的队列操作才行。

  // 最后通过事件的方法 通知以后再开始 start
  postMessage(JSON.stringify({ success: true }));
  // 最后发现 异步队列的问题就是 不知道谁先谁后的问题 ，双线程 有一个 先后顺序
  // 如何保证 谁先谁后
  self.addEventListener("message", async function (message) {
    const currentVisited = new Date().getTime();
    const { saveType, data, idle } = JSON.parse(message.data);
    if (idle) {
      // 空闲就clear Performance
    }
    if (saveType === "store") {
      // 够时间了 就开一手 hack 定时任务
      if (
        // 这里localStorage 存放的永远是字符串 所以 不能用 !data.LastVisited 来简单判断
        data.LastVisited === "undefined" ||
        currentVisited - parseInt(data.LastVisited) > TIMEGAP
      ) {
        startCleanWorker(DBRequest);
        // 顺便记录一下时间
        postMessage(
          JSON.stringify({
            saveType: "store",
            acceptLastVisited: currentVisited,
          })
        );
      }
    } else if (saveType === "indexDB") {
      const { operatorType, tableName } = data;
      // console.log(data);
      // console.log(operatorType, tableName, "indexDB");
      db[operatorType as OperatorType](DBRequest, tableName, data.data);
    }
  });
}

main();
