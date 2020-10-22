import { beautifyConsole } from "../utils/index";
import { Data } from "./index";
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
  constructor(databaseName: string, version = 1.0) {
    const that = this; //保存一下 怕回调函数 搞错了this
    const DBRequest = indexedDB.open(databaseName, version);

    this.transactionList = [];
    DBRequest.onerror = function () {
      beautifyConsole("[ MonitorSDK ]", "数据库打开报错");
    };

    DBRequest.onsuccess = function () {
      // that.DB = DBRequest.result;
      beautifyConsole("[ MonitorSDK ]", "数据库打开成功");
      // 只能拿到的时候 再用 观察者 模式 进行 开搞
      that.transactionList.forEach((val) => val(DBRequest.result));
    };

    DBRequest.onupgradeneeded = function (event: any) {
      const currentDB = event.target.result;
      // 这是一个表
      if (!currentDB.objectStoreNames.contains("error")) {
        // 自增长才能插入进去
        const objectStore = currentDB.createObjectStore("error", {
          keyPath: "trackId",
          autoIncrement: true,
        });
        // 这是创建字段 索引是方便 搜索吧?
        // objectStore.createIndex("error", "error", { unique: true });
      }
    };
  }

  add(tableName: string, data: Data) {
    const that = this;
    // 放在宏任务 里面 等待 出来? 感觉是不是有点 问题?
    // 感觉还是观察者模式 比较靠谱一些
    // 类似中间件类型的 写一个 函数 可以执行?
    this.transactionList.push(function (DB) {
      // 哪个表的事务.... 感觉有点多余
      const request = DB.transaction([tableName], "readwrite")
        .objectStore(tableName)
        .add(data);

      request.onsuccess = function (event) {
        console.log("数据写入成功");
      };
      request.onerror = function (event) {
        console.warn(event);
        console.log("数据写入失败");
      };
    });
  }

  read(tableName: string) {
    this.transactionList.push(function (DB) {
      var objectStore = DB.transaction([tableName]).objectStore(tableName);
      objectStore.openCursor().onsuccess = function (event: any) {
        var cursor = event.target.result;
        if (cursor) {
          console.log(cursor.value);
          cursor.continue();
        } else {
          console.log("没有更多数据了！");
        }
      };
    });
  }
}
