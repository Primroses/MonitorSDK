import DB from "../data/dataBase";
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

async function cleanTableData() {
  const data = await db.read("error");
  console.log(data.length);
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
  }
}
cleanTableData();
