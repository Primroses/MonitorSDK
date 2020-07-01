import { UpLoadData } from "./types";
// 本来应该是一个数据流的 但是简单的理解为一个store 数据的存储地方就好了

// 有没有必要使用IndexDB 进行数据持久化的存储
class Store {
  //   private DBRequest: IDBOpenDBRequest; // 当时用来记录当前的请求(数据库的)
  public DB: IDBDatabase;
  //   private ErrorTable: IDBObjectStore;  // 记录当前的表
  // 先用localstorage做持久化 后续可能需要转成IndexDB 或者是LRU的Localstorage (不能存多个数据需要转字符串 而且不能针对每个ID进行存储)
  constructor() {
    // 好像这里就得知道是什么数据库。。。 不传的话好像就是默认是当前版本  那后续如果要修改呢？
    const that = this;
    // 拿到创建这次数据库的请求(后续可能不需要用了)
    const DBRequest = window.indexedDB.open("track");

    DBRequest.onerror = function () {
      console.log("open DataBase fail");
    };

    // 第一次进来的时候需要 监听这个方法进行创建Store  onsuccess 没有这个方法
    DBRequest.onupgradeneeded = function () {
      // 获取当前的数据库对象
      that.DB = DBRequest.result;
      // track 表
      if (!that.DB.objectStoreNames.contains("track")) {
        // 主键不唯一 且每次都需要增加 所以 需要一个操作
        // 关闭浏览器的时候 直接全部上报并且 indexDB 从零开始
        // 用localStorage 记录当前的 keyPath 后续不断的增加 ，上报逻辑也可以斟酌修改
        // 接口... 不太现实 总的来说还是数据持久化的问题
        that.DB.createObjectStore("track", {
          keyPath: "id",
        });
      }
    };
    // 这里是异步操作的。可能还没有等异步操作完就直接create了
    DBRequest.onsuccess = function () {
      that.DB = DBRequest.result; // 当前操作数据库的对象？
    };
  }
  // key ,value localStorage 明显不适合存这种数据(直接更换indexDB 2020/6/24)
  // 新增数据
  create(data: UpLoadData, tableName:string) {
    // 可能DB 不存在 用到的时候可能才存在 都是异步的
    if (this.DB) {
      // 一个事务
      const request = this.DB.transaction([tableName], "readwrite")
        // 操作的表名
        .objectStore(tableName)
        // 需要的操作
        .add(data);
      request.onsuccess = function (event) {
        console.log(`write data success in table ${tableName}`);
      };
      request.onerror = function (event) {
        console.error(event);
        console.error(`write data fail in table ${tableName}`);
      };
    }
  }
  // 获取数据
  read(tableName:string) {
    if (this.DB) {
      const transaction = this.DB.transaction([tableName]); // 事务： IDBTransaction 对象 (操作之前需要一个事务)
      const objectStore = transaction.objectStore(tableName); // 对象仓库：IDBObjectStore 对象(类似表格)
      // const request = objectStore.get(1);                  // 操作请求：IDBRequest 对象

      objectStore.openCursor().onsuccess = function (event: any) {
        // 每次去到Event就很难了
        const data: UpLoadData[] = [];
        var cursor = event.target.result;
        // openCursor 需要循环才能把里面的东西取出来
        if (cursor) {
          console.log(cursor);
          data.push(cursor.value);
          cursor.continue();
        } else {
          console.log("not have more Data");
          // 取完数据就在这里出来
          // 读出来之后就上报
        }
      };
    }
  }
  clear(tableName: string) {
    if (this.DB) {
      const currentStore = this.DB.transaction([tableName]).objectStore(
        tableName
      ); // 获得当前的store(表格)

      const request = currentStore.clear(); // 全部清除
      request.onsuccess = function () {
        console.log(`The ${tableName}'s data has been cleared`);
      };
      request.onerror = function (error) {
        console.log(error);
        console.log(`The ${tableName}'s data cleaning has been failed`);
      };
    }
  }
  delete(tableName: string, key?: number) {
    if (this.DB) {
      const currentStore = this.DB.transaction([tableName]).objectStore(
        tableName
      ); // 获得当前的store(表格)

      const request = currentStore.delete(key); // 全部清除
      request.onsuccess = function () {
        console.log(`The ${tableName}'s data has been cleared`);
      };
      request.onerror = function (error) {
        console.log(error);
        console.log(`The ${tableName}'s data cleaning has been failed`);
      };
    }
  }
}

export const store = new Store();
