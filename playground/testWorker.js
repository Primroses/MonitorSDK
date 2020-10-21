self.addEventListener("message", function (e) {
  // self.postMessage("You Tell Me:", e.data);
  console.log(e.data);
  postMessage("You Tell Me:" + e.data);
});

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
    this.DBRequest = indexedDB.open(databaseName, version);

    this.DBRequest.onerror = function (event) {
      console.log("数据库打开报错");
      console.log(event);
    };

    this.DBRequest.onsuccess = function (event) {
      that.db = that.DBRequest.result;
      console.log("数据库打开成功");
    };

    this.DBRequest.onupgradeneeded = function (event) {
      db = event.target.result;
      if (!db.objectStoreNames.contains('person')) {
        objectStore = db.createObjectStore('person', { keyPath: 'id' });
      }
    };
  }
}

const db = new DB("test");
