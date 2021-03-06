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
  DBRequest: IDBOpenDBRequest;
  constructor(databaseName: string, version = 1.0) {
    const that = this; //保存一下 怕回调函数 搞错了this
    this.DBRequest = indexedDB.open(databaseName, version);
    this.DBRequest.onerror = function () {};

    this.DBRequest.onsuccess = function () {
      // 只能拿到的时候 再用 观察者 模式 进行 开搞
    };

    this.DBRequest.onupgradeneeded = function (event: any) {
      const currentDB = event.target.result;
      const tableNames: TableName[] = ["error", "track", "performance"];
      // 这是一个表
      for (let tableName of tableNames) {
        if (!currentDB.objectStoreNames.contains(tableName)) {
          // 自增长才能插入进去
          const objectStore = currentDB.createObjectStore(tableName, {
            keyPath: tableName === "track" ? `pathId` : `${tableName}Id`,
            autoIncrement: true,
          });
          // 这是创建字段 索引是方便 搜索吧?
          // objectStore.createIndex("mainType", "mainType");
        }
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

  async add(DBRequest: IDBDatabase, tableName: string, data: Data) {
    // 放在宏任务 里面 等待 出来? 感觉是不是有点 问题?
    // 感觉还是观察者模式 比较靠谱一些
    // 类似中间件类型的 写一个 函数 可以执行?
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

  async read(DBRequest: IDBDatabase, tableName: string, mainType?: string) {
    const result: Data[] = [];
    const objectStore = DBRequest.transaction([tableName]).objectStore(
      tableName
    );
    if (mainType) {
      // 这个是基于索引搜索的 感觉作用不大 因为如果是索引是多个的话 就不知道什么时候发送完
      const indexRequest = objectStore.index("mainType").get(mainType);
      return new Promise<Data[]>((resolve, reject) => {
        indexRequest.addEventListener("success", function (event: any) {
          var cursor = event.target.result; //不是游标 是一个个数据
          resolve(cursor);
        });
        objectStore.openCursor().addEventListener("error", function (event) {
          reject(event);
        });
      });
    } else {
      return new Promise<Data[]>((resolve, reject) => {
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
  }
  // 直接清理一手
  async clear(DBRequest: IDBDatabase, tableName: string) {
    const objectStore = DBRequest.transaction(
      [tableName],
      "readwrite"
    ).objectStore(tableName);
    return new Promise<IDBRequest>((resolve) => {
      const ret = objectStore.clear();
      resolve(ret);
    });
  }
}

// 1. 观察者模式 就很难拿到里面的返回值了???
// 尝试1. onsuccess 才能 返回 DB对象 ，但是后面需要用的时候 拿不到的，就得异步获取
// 观察者模式，监听onsuccess 的时候 将 DB对象注入后 再执行 后续的操作，
// 但是 read操作的时候 因为是在 异步中 无法返回 result的结果

// 2. DB 方法设计的时候 不能 在 实例的方法里面 进行 DBRequest的初始化，后续有以下场景
// 读取 DB 表 然后 清空DB表 后 再 添加
// 这里会出现一个问题就是 每次 执行实例方法(add, read, clear)等 的时候，都会等待异步的DBRequest的初始化，
// 这里可能会导致 后续的方法 因为阻塞而没有执行? (猜测)
