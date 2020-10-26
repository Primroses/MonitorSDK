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
class DB {
  constructor(databaseName, version = 1.0) {
    const that = this; //保存一下 怕回调函数 搞错了this
    const DBRequest = indexedDB.open(databaseName, version);
    // this.db = null;
    this.transactionList = [];
    DBRequest.onerror = function (event) {
      // console.log("数据库打开报错");
      console.log(event);
    };

    DBRequest.onsuccess = function (event) {
      that.DB = DBRequest.result;
      // console.log("数据库打开成功");
      // 只能拿到的时候 再用 观察者 模式 进行 开搞
      that.transactionList.forEach((val) => val(DBRequest.result));
    };

    DBRequest.onupgradeneeded = function (event) {
      const currentDB = event.target.result;
      // 这是一个表
      if (!currentDB.objectStoreNames.contains("error")) {
        const objectStore = currentDB.createObjectStore("error", {
          keyPath: "userId",
        });
        // 这是创建字段 索引是方便 搜索吧?
        // objectStore.createIndex("error", "error", { unique: true });
      }
    };
  }

  add(tableName, data) {
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
        console.log("数据写入失败");
      };
    });
  }

  read(tableName) {
    this.transactionList.push(function (DB) {
      var objectStore = DB.transaction([tableName]).objectStore(tableName);
      objectStore.openCursor().onsuccess = function (event) {
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

Promise.reject("ACA")