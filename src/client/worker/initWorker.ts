import Store from "../utils/storage";
import { Data } from "../data/index";
interface sendWorkData {
  operatorType: OperatorType;
  tableName: string;
  data: {
    [key: string]: any;
  };
}

// 引入 web worker 增强计算能力?
// 还是封装一手比较 舒服
export class InitWorker {
  worker: Worker;
  store: Store;
  constructor() {
    this.worker = new Worker("../worker.js");

    this.store = new Store();
  }

  sentMessageToWorker(data: sendData) {
    this.worker.postMessage(JSON.stringify(data));
  }
  // 这里其实是开启监听 后续的交互都在这里交互了....
  acceptMessageFromWorker(
    worker: InitWorker,
    req: (data: Data, url: string) => void
  ) {
    const that = this;
    this.worker.addEventListener("message", (message: MessageEvent) => {
      // 日常石乐志
      const {
        saveType,
        acceptLastVisited,
        data,
        success,
        tableName,
      } = JSON.parse(message.data);
      
      // 因为这里涉及一个 异步 和 谁先谁后的问题。最后采取worker准备好了 就通知主线程 再发送确保一定能收到通知后再进行操作
      // 谁先谁后 监听到就行?
      if (success) {
        const LastVisited = worker.store.get("LastVisited");
        worker.sentMessageToWorker({
          saveType: "store",
          data: { LastVisited },
        });
      }
      if (saveType === "store") {
        that.store.set("LastVisited", acceptLastVisited);
      } else if (saveType === "indexDB") {
        // 这里需要一个 tableName 在写入的时候 写进去
        req({ ...data, tableName: tableName }, `/error`);
      }
    });
    this.worker.addEventListener("messageerror", (message: MessageEvent) => {});
  }

  add(saveType: SaveType, data: sendWorkData) {
    this.sentMessageToWorker({ saveType, data });
  }

  read(saveType: SaveType, data: sendWorkData) {
    this.sentMessageToWorker({ saveType, data });
  }

  clear(saveType: SaveType, data: sendWorkData) {
    this.sentMessageToWorker({ saveType, data });
  }
}

export function workerMain(req: (data: Data, url: string) => void) {
  const worker = new InitWorker();
  worker.acceptMessageFromWorker(worker, req);

  // if (saveType === "store") {
  //   context.worker.store.set("LastVisited", acceptLastVisited);
  // } else if (saveType === "indexDB") {
  //   console.log(data, "IndexDB");
  // }
  // 其实也不是不可以 因为 我不需要等 带它操作 我只需要拿到这个对象就可以了....
}

// 现在启动不能百分百启动
