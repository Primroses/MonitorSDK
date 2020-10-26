import DB from "../data/dataBase";
import { ErrorData } from "../data/index";

type DBOpreatorKeys = "add" | "clear" | "read";

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

async function cleanTableData(DBRequest: IDBDatabase, tableName: string) {
  // 我觉得 error 里面就应该存在那种 patch Function中出现的问题 。正常的error 都应该直接上报的
  let data = await db.read(DBRequest, tableName); // 先读表

  await db.clear(DBRequest, tableName); // 然后清除表
  // 定时清理 但是 应该要的是LRU 才对的 翻转过来 的 LRU 好像有点扯?
  // 这种错误 直接过滤成
  const retData: ErrorData[] = [];
  const stackSet = new Set<string>();
  if (tableName === "error") {
    // const retIndex: number[] = []; // 本来还想记录一下 index 值的 这里需要考虑一下 记不记录
    for (let error of data) {
      // 拿到关键的 对比
      const { message } = error.data;
      if (!stackSet.has(message.trim())) {
        stackSet.add(message.trim());
      }
    }
    // 超级简单的LRU 算法 性能肯定没有 链表来得好 LRU 过后 将拿出来的 数据全部都上传....
    // LRU的目的是 将最后出现的那个 留下来 ，就是这个时间内 这个bug 还是出现的 这个错误仍然存在
    for (let message of stackSet) {
      retData.push(
        data.filter((val) => message === val.data.message.trim()).pop()
      );
    }
    for (let data of retData) {
      db.add(DBRequest, tableName, data); // 把LRU的数据再添加进去
    }
    // LRU 过后 得同步 找到对应 index 值 删掉 其中的 不要全部删掉?
  }
  // 日常没找到 标点符号 .....
}

// 启动 worker
async function startWorker() {
  const DBRequest = await db.DBResolve();
  const cleanTables: string[] = ["error"];
  // beautifyConsole("[Monitor SDK]", "worker启动");
  for (let i = 0; i < cleanTables.length; i++) {
    // for 循环 不会并行 而是串行?
    cleanTableData(DBRequest, cleanTables[i]);
  }
}

// 前端定时任务? 是不是得 通过localstroage 来实现呢? 而且还是不太标准的定时任务?
// 不可能每天都打开你的 网页吧? 还是得hack 一手

// main 入口
async function main() {
  const DBRequest = await db.DBResolve();

  const TIMEGAP = 1000 * 60 * 60 * 24; // 一天差距

  self.addEventListener("message", function (message) {
    const { type, data } = JSON.parse(message.data);
    console.log(data.LastVisited, "LastVisited");

    const currentVisited = new Date().getTime();
    // 第一次 或者是 被人错手删掉了 LastTime
    if (type === "store") {
      if (
        !data.LastVisited ||
        currentVisited - parseInt(data.LastVisited) > TIMEGAP
      ) {
        // 够时间了 就开一手 hack 定时任务
        startWorker();
        // 顺便记录一下时间
        postMessage(JSON.stringify({ LastVisited: currentVisited }));
      }
    } else if (type === "indexDB") {
      const { operator } = data;
      const operatorFun = db[operator as DBOpreatorKeys];
      operatorFun(DBRequest, data.tableName, data.data);
    }
  });
}

main();
