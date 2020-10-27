import { Data } from "./index";
import { InitWorker } from "./../worker/initWorker";
import DB from "./dataBase";

// 主线程专用添加修改数据的 队列

// 因为IndexDB 异步的原因。获取DBDataBase对象需要异步 这里就会出现很多问题
// 在实例方法里多次拿 会造成 后续拿不到的情况 并直接跳过不执行后续方法
// 假如全局Context 中 异步获取的时候，又因为监听事件在 异步获取之前，导致监听的时候 没有执行 patch的代码 导致无法上报错误

// 将所有IndexDB的读写都放进 worker里面做。
// 各司其职
// 主线程的IndexDB读写 应该 也要放到webWorker里面 假如 不断的读写 也能不阻塞主线程的情况下进行读写

// 后续发现 直接操作 worker 就可以了 这个东西暂时就废弃了
type Quene =
  | {
      operatorType: OperatorType;
      tableName: string;
      data: Data;
    }[]
  | undefined;

export default class DataQuene {
  dataQuene: Quene;
  db: DB;
  worker: InitWorker;
  dataOperator: Map<OperatorType, Function>;
  constructor() {
    this.worker = new InitWorker();
    this.db = new DB("monitor");
    // 事件队列
    this.dataQuene = [];
  }
  // 推进队列中
  add(operatorType: OperatorType, tableName: string, data?: Data) {
    // 好像之前写的都没有判空....
    this.dataQuene.push({ operatorType, tableName, data });
    // this.run();
  }
  // 关键的run 方法?
  run() {
    // 实例化DB对象
    if (this.dataQuene.length) {
      // 拿到队列的第一个
      const params = this.dataQuene.shift();
      this.worker[params.operatorType as OperatorType]("indexDB", params);
      // 保证把 队列里面所有的CallBack全部执行
      this.run();
    }
  }
}
