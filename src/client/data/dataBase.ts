import { beautifyConsole } from "../utils/index";
import { Data, ErrorData } from "./index";
interface TransactionList {
  (DB: IDBDatabase): void;
}
/**
 * 数据库：IDBDatabase 对象
 * 对象仓库：IDBObjectStore 对象
 * 索引： IDBIndex 对象
 * 事务： IDBTransaction 对象
 * 操作请求：IDBRequest 对象
 * 指针： IDBCursor 对象
 * 主键集合：IDBKeyRange 对象
 * @class DB
 */
export default class DB {
  transactionList: TransactionList[];
  DBRequest: IDBOpenDBRequest;
  constructor(databaseName: string, version = 1.0) {
    const that = this; //保存一下 怕回调函数 搞错了this
    this.DBRequest = indexedDB.open(databaseName, version);

    this.transactionList = [];
    this.DBRequest.onerror = function () {
      // beautifyConsole("[ MonitorSDK ]", "数据库打开报错");
    };

    this.DBRequest.onsuccess = function () {
      // that.DB = DBRequest.result;
      // beautifyConsole("[ MonitorSDK ]", "数据库打开成功");
      // 只能拿到的时候 再用 观察者 模式 进行 开搞
      that.transactionList.forEach((val) => val(that.DBRequest.result));
    };

    this.DBRequest.onupgradeneeded = function (event: any) {
      const currentDB = event.target.result;
      // 这是一个表
      if (!currentDB.objectStoreNames.contains("error")) {
        // 自增长才能插入进去
        const objectStore = currentDB.createObjectStore("error", {
          keyPath: "errorId",
          autoIncrement: true,
        });
        // 这是创建字段 索引是方便 搜索吧?
        // objectStore.createIndex("error", "error", { unique: true });
      }
    };
  }

  DBResolve() {
    const that = this;
    return new Promise<IDBDatabase>((resolve, reject) => {
      that.DBRequest.addEventListener("success", function () {
        resolve(that.DBRequest.result);
      });
    });
  }

  async add(tableName: string, data: Data) {
    // 放在宏任务 里面 等待 出来? 感觉是不是有点 问题?
    // 感觉还是观察者模式 比较靠谱一些
    // 类似中间件类型的 写一个 函数 可以执行?

    // this.transactionList.push(function (DB) {
    //   // 哪个表的事务.... 感觉有点多余
    // const request = DB.transaction([tableName], "readwrite")
    //   .objectStore(tableName)
    //   .add(data);

    //   request.onsuccess = function (event) {
    //     console.log("数据写入成功");
    //   };
    //   request.onerror = function (event) {
    //     console.warn(event);
    //     console.log("数据写入失败");
    //   };
    // });

    const DBRequest = await this.DBResolve();
    const request = DBRequest.transaction([tableName], "readwrite")
      .objectStore(tableName)
      .add(data);

    return new Promise((resolve, reject) => {
      request.addEventListener("success", function (event) {
        resolve(event);
      });
      request.addEventListener("error", function (event) {
        reject(event);
      });
    });
  }

  // 感觉还是得设计成 promise 比较友好一点 毕竟异步

  async read(tableName: string) {
    // this.transactionList.push(function (DB) {
    //   const result = [];
    //   var objectStore = DB.transaction([tableName]).objectStore(tableName);
    //   objectStore.openCursor().onsuccess = function (event: any) {
    //     var cursor = event.target.result;
    //     if (cursor) {
    //       result.push(cursor.value);
    //       cursor.continue();
    //     } else {
    //       console.log("没有更多数据了！");
    //     }
    //   };
    // });
    const result: Data | ErrorData[] = [];
    const DBRequest = await this.DBResolve();
    const objectStore = DBRequest.transaction([tableName]).objectStore(
      tableName
    );
    return new Promise<ErrorData[]>((resolve, reject) => {
      objectStore
        .openCursor()
        .addEventListener("success", function (event: any) {
          var cursor = event.target.result;
          if (cursor) {
            result.push(cursor.value);
            cursor.continue();
          } else {
            resolve(result);
          }
        });
      objectStore.openCursor().addEventListener("error", function (event) {
        reject(event);
      });
    });
  }
  // 直接清理一手
  async clear(tableName: string) {
    
    const DBRequest = await this.DBResolve();
    const objectStore = DBRequest.transaction(
      [tableName],
      "readwrite"
    ).objectStore(tableName);

    return new Promise<any>((resolve, reject) => {
      const ret = objectStore.clear();
      console.log(ret, "RET_____");
      resolve(ret);
    });
  }
}

// 1. 观察者模式 就很难拿到里面的返回值了???
// 尝试1. onsuccess 才能 返回 DB对象 ，但是后面需要用的时候 拿不到的，就得异步获取
// 观察者模式，监听onsuccess 的时候 将 DB对象注入后 再执行 后续的操作，
// 但是 read操作的时候 因为是在 异步中 无法返回 result的结果
