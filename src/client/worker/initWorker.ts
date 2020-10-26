import Store from "../utils/storage";

interface sendData {
  type: "store" | "indexDB";
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

  async sentMessageToWorker(data: sendData) {
    const that = this;
    return new Promise<boolean>((resolve, rejcet) => {
      that.worker.postMessage(JSON.stringify(data));
      resolve(true);
    });
  }

  async acceptMessageFromWorker() {
    const that = this;
    return new Promise<any>((resolve, reject) => {
      that.worker.addEventListener("message", (data: MessageEvent) => {
        resolve(data.data);
      });

      that.worker.addEventListener("messageerror", (data: MessageEvent) => {
        reject(data.data);
      });
    });
  }

  add(type: "store" | "indexDB", data: any) {
    this.sentMessageToWorker({ type, data });
  }

  read(type: "store" | "indexDB", data: any) {
    this.sentMessageToWorker({ type, data });
  }

  clear(type: "store" | "indexDB", data: any) {
    this.sentMessageToWorker({ type, data });
  }
}

export async function workerMain() {
  const initWorker = new InitWorker();
  const LastVisited = initWorker.store.get("LastVisited");
  initWorker.sentMessageToWorker({ type: "store", data: { LastVisited } });

  const {
    LastVisited: acceptLastVisited,
  } = await initWorker.acceptMessageFromWorker();
  initWorker.store.set("LastVisited", acceptLastVisited);
}
