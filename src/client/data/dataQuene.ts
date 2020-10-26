import { Data } from "./index";
import { InitWorker } from "./../worker/initWorker";
import DB from "./dataBase";

// 主线程专用添加修改数据的 队列

// 因为IndexDB 异步的原因。获取DBDataBase对象需要异步 这里就会出现很多问题
// 在实例方法里多次拿 会造成 后续拿不到的情况 并直接跳过不执行后续方法
// 假如全局Context 中 异步获取的时候，又因为监听事件在 异步获取之前，导致监听的时候 没有执行 patch的代码 导致无法上报错误

// 暂时 认为的解决方案就是 用事件队列来做，事件队列 里面都是待处理的 数据
// 实例化DB对象后 再从队列里面 轮询进行 数据的 上报 或者是 读写

// 主线程的IndexDB读写 应该 也要放到webWorker里面 假如 不断的读写 也能不阻塞主线程的情况下进行读写

type CallBack = (DBRequest: IDBDatabase) => void;
type DataOperator = "add" | "read" | "clear";
export default class DataQuene {
  dataQuene: CallBack[];
  db: DB;
  worker: InitWorker;
  dataOperator: Map<DataOperator, Function>;
  constructor() {
    this.worker = new InitWorker();
    this.db = new DB("monitor");
    // 事件队列
    this.dataQuene = [];

    this.dataOperator = new Map();

    this.dataOperator.set("add", this.worker.add);
    this.dataOperator.set("read", this.worker.read);
    this.dataOperator.set("clear", this.worker.clear);
  }
  // 推进队列中
  add(type: DataOperator, tableName: string, data?: Data) {
    // 好像之前写的都没有判空....

    const operator = this.dataOperator.get(type);
    this.dataQuene.push(operator("indexDB", { type, tableName, data }));
    this.run();
  }
  // 关键的run 方法?
  async run() {
    // 实例化DB对象
    const DBRequest = await this.db.DBResolve();
    if (this.dataQuene.length) {
      // 拿到队列的第一个
      const currentTask = this.dataQuene.shift();
      currentTask(DBRequest);
      // 保证把 队列里面所有的CallBack全部执行
      this.run();
    }
  }
}
