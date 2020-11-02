import { store, Store } from "../utils/storage";
import { Data } from "../data/index";
import { flatten } from "../utils/index";
import { channel } from "../EventChannel/index";

interface sendWorkData {
  operatorType: OperatorType;
  tableName: string;
  data: {
    [key: string]: any;
  };
}
type ContextGetRequest = (
  data: Data & { tableName: string },
  url: string
) => void;

type ContextPostRequest = (
  data: Data & { tableName: string },
  url: string
) => void;

// 引入 web worker 增强计算能力?
// 还是封装一手比较 舒服
export class InitWorker {
  worker: Worker;
  store: Store;
  success: boolean;
  messageQuene: sendData[];
  constructor() {
    this.worker = new Worker("./worker.js");
    this.messageQuene = [];
    this.store = store;
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
   * @param {ContextGetRequest} req
   * @memberof InitWorker
   */
  acceptMessageFromWorker(
    worker: InitWorker,
    getReq: ContextGetRequest,
    postReq: ContextPostRequest
  ) {
    const that = this;
    this.worker.addEventListener("message", (message: MessageEvent) => {
      const { saveType, acceptLastVisited, data, success } = JSON.parse(
        message.data
      );

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
        // 因为这里已经是整合了的数据 可能会比较大 所以 这里要采取post的请求 不限制长度 也避免了 get 请求 出现特殊字符的时候 url 别截取的情况
        // 这里需要一个 tableName 在写入的时候 写进去
        // getReq({ ...data, tableName }, `/error`);
        // 这里得减少请求 次数
        // postReq({ ...data, tableName }, `/postError`);
        // reqQuene.push({ ...data, tableName, url: `/postError` });

        // 这里的data 还得扁平化
        const reqQuene = flatten(data); // 经过重重筛选后 最后的上报
        // 把一次所有的都上报
        postReq(reqQuene, `/postError`);
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
 * @param {ContextGetRequest} req
 */
export function workerMain(
  getReq: ContextGetRequest,
  postReq: ContextPostRequest
) {
  worker.acceptMessageFromWorker(worker, getReq, postReq);

  channel.subscribe("IDLE", function () {
    if ((window as any).requestIdleCallback) {
      (window as any).requestIdleCallback(function () {
        console.log("idle");
        worker.worker.postMessage(JSON.stringify({ idle: true }));
      });
    } else {
      // 不支持就直接发送了 占用一点资源
      worker.worker.postMessage(JSON.stringify({ idle: true }));
    }
  });
}
