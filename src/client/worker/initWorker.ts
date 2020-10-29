import Store from "../utils/storage";
import { Data } from "../data/index";

interface sendWorkData {
  operatorType: OperatorType;
  tableName: string;
  data: {
    [key: string]: any;
  };
}
type ContextRequest = (data: Data & { tableName: string }, url: string) => void;
// 引入 web worker 增强计算能力?
// 还是封装一手比较 舒服
export class InitWorker {
  worker: Worker;
  store: Store;
  success: boolean;
  messageQuene: sendData[];
  constructor() {
    this.worker = new Worker("../worker.js");
    this.messageQuene = [];
    this.store = new Store();
  }
  /**
   * @param {sendData} data
   * @memberof InitWorker
   */
  sentMessageToWorker(data: sendData) {
    const that = this;
    if (this.success) {
      if (this.messageQuene.length) {
        this.messageQuene.forEach((val) => {
          that.worker.postMessage(JSON.stringify(val));
        });
        this.messageQuene = []; // 发完就清空
      }
      // 把这次的也发送了...
      that.worker.postMessage(JSON.stringify(data));
    } else {
      this.messageQuene.push(data); // 先暂存一下 等待时机 一波发送
    }
  }
  // 这里其实是开启监听 后续的交互都在这里交互了....
  /**
   *
   * @param {InitWorker} worker
   * @param {ContextRequest} req
   * @memberof InitWorker
   */
  acceptMessageFromWorker(worker: InitWorker, req: ContextRequest) {
    const that = this;
    this.worker.addEventListener("message", (message: MessageEvent) => {
      const {
        saveType,
        acceptLastVisited,
        data,
        tableName,
        success,
      } = JSON.parse(message.data);

      // 因为这里涉及一个 异步 和 谁先谁后的问题。最后采取worker准备好了 就通知主线程 再发送确保一定能收到通知后再进行操作
      // 谁先谁后 监听到就行?
      if (success) {
        this.success = true;
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
        console.log(data, tableName);
        req({ ...data, tableName: tableName }, `/error`);
      }
    });
    this.worker.addEventListener("messageerror", (message: MessageEvent) => {});
  }

  /**
   *
   * @param {SaveType} saveType
   * @param {sendWorkData} data
   * @memberof InitWorker
   */
  add(saveType: SaveType, data: sendWorkData) {
    this.sentMessageToWorker({ saveType, data });
  }
  /**
   *
   *
   * @param {SaveType} saveType
   * @param {sendWorkData} data
   * @memberof InitWorker
   */
  read(saveType: SaveType, data: sendWorkData) {
    this.sentMessageToWorker({ saveType, data });
  }
  /**
   *
   *
   * @param {SaveType} saveType
   * @param {sendWorkData} data
   * @memberof InitWorker
   */
  clear(saveType: SaveType, data: sendWorkData) {
    this.sentMessageToWorker({ saveType, data });
  }
}
export const worker = new InitWorker();
/**
 *
 *
 * @export
 * @param {ContextRequest} req
 */
export function workerMain(req: ContextRequest) {
  worker.acceptMessageFromWorker(worker, req);
}
