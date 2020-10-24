import DB from "../data/dataBase";
import { ErrorData } from "../data/index";
// 这里是做数据清洗的 因为可能会多次触发同一次事件

// errorId 和 trackId 的思考
// 主要是记录本次的 track路径 方便后续 可以还原 该用户的一些操作
// trackId  应该是用户这一次 登录 应用中 所操作的所有 而不是每次都增长 所以trackId 是 贮藏在内存中 每次 进入应用就应该自动生成的Id
// 因为每个用户都不一样 生成的 trackId 也应该不一样 需要一个生成trackId的库? 当前请求的时间 混合的算法?
// errorId 才是每次都自动增长

// 第一 怎么去 生成一个 trackId / errorId 这样 唯一标识这一次是 一个 连串事件

// 第二 清洗的是什么数据 ，多余的数据。即用户多次 触发的 无用数据 ，虽然都记录在 数据库中 但是不需要全部都上传的 服务器资源。

const db = new DB("monitor");

// 这里先清洗数据 清洗的目的是 先把所有的表格 数据 都拿出来 后再进行 清洗
// 清洗的是 多次 重复性数据 感觉 可以 LRU.... (LRU 也是 清洗的一部分 保证里面只有一条....)

// 客户端和 服务端的清理是不一样的? 客户端 尽量保证 数据的 单一性 ，重复性数据 尽量 不出现
// 服务端 是清理 不同用户的数据 如果 多个用户同时 出现 相同的问题 就得 注意了....

// 但是LRU 有一个问题就是 假如那人 首页 -> 详情页 -> 首页 -> 详情页 这样的话 存储的情况就是 详情页 在栈顶了 违反了 一些 正常逻辑...

// 还先不能考虑 小程序 。小程序 不知道支不支持 web worker

async function cleanTableData(tableName: string) {
  // 我觉得 error 里面就应该存在那种 patch Function中出现的问题 。正常的error 都应该直接上报的
  let data = await db.read(tableName);
  // 定时清理 但是 应该要的是LRU 才对的 翻转过来 的 LRU 好像有点扯?
  // 这种错误 直接过滤成

  if (tableName === "error") {
    const retData: ErrorData[] = [];
    const stackSet = new Set<string>();
    // const retIndex: number[] = []; // 本来还想记录一下 index 值的 这里需要考虑一下 记不记录
    for (let error of data) {
      // 拿到关键的 对比
      const { stack } = error.data;
      if (!stackSet.has(stack.trim())) {
        stackSet.add(stack.trim());
      }
    }
    // 超级简单的LRU 算法 性能肯定没有 链表来得好 LRU 过后 将拿出来的 数据全部都上传....
    for (let stack of stackSet) {
      retData.push(
        data.filter((val, index) => stack === val.data.stack.trim()).pop()
      );
    }
    await clearAll(tableName);
    // LRU 过后 得同步 找到对应 index 值 删掉 其中的 不要全部删掉?
    for (let ret of retData) {
      await db.add(tableName, ret);
    }
  }
  // 日常没找到 标点符号 .....
}

async function clearAll(tableName: string) {
  await db.clear(tableName);
}

// 启动 清除
const cleanTables: string[] = ["error"];

cleanTables.forEach((val) => {
  cleanTableData(val);
});
