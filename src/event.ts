type Listener = () => void;
// 事件总线 每一个基础类库当成 第三方库来写
interface listern {
  id: number;
  listener: Listener;
  once?: boolean; // 保存是否只执行一次
}
class EventChannel {
  private map: Map<string, listern[]>;
  public subId: number;
  constructor() {
    this.map = new Map();
    this.subId = 0; // 订阅者的Id  可以用来取消订阅?
  }
  // 中间桥梁 notify  告知订阅者已经消息来了
  notify(name: string) {
    if (!this.map.get(name)) {
      throw new Error(`It doesn't have ${name} event`);
    }
    const listeners = this.map.get(name); // 拿到这些订阅的小孩
    // 这些都是函数 直接执行即可？
    listeners.map((val) => {
      // 或者要不要传参数的?
      if (!val.once) {
        val.listener();
        val.once = true;
      }
    });
  }

  // 发布者发布今天的报纸可以订阅的时候 需要在 channel里面添加一条数据
  increase(name: string) {
    // 新增一个记录就可以 等待订阅者来订阅消息
    this.map.set(name, []);
  }
  // 订阅者要在 channel 里面订阅才可以
  add(name: string, listen: listern) {
    if (!this.map.get(name)) {
      throw new Error(`It doesn't have ${name} event`);
    }
    const listeners = this.map.get(name);

    listeners.push(listen);
  }
  // cancel
  cancel(name: string, subId: number) {
    if (!this.map.get(name)) {
      throw new Error(`It doesn't have ${name} event`);
    }
    const listens = this.map.get(name);

    listens.filter((val) => val.id != subId);
  }
}

// 事件中心(只能有一个，只能在一个地方进行发布和订阅(报纸亭))
export const channel = new EventChannel();

// 发布者(也可以有多个)
export class Publisher {
  // 类也可以当类型？
  private channel: EventChannel;
  private subId: number;
  constructor() {
    this.channel = channel;
    this.subId = channel.subId++;
  }
  // 发布事件
  publish(name: string) {
    this.channel.increase(name);
  }
  //
}

// 订阅者(可以有多个订阅者)
export class Subscriber {
  private channel: EventChannel;
  private subId: number;
  constructor() {
    this.channel = channel;
    this.subId = this.channel.subId;
  }
  // 订阅事件
  subscribe(name: string, listener: Listener) {
    this.channel.add(name, {
      id: this.subId,
      listener,
    });
  }
  // 能不能取消订阅? 报纸看够 换另外一份
  unSubscribe(name: string) {
    // 取消的逻辑放在里面
    this.channel.cancel(name, this.subId);
  }
  // 报纸只想来一份 明天别给我送了 试探一下你的报纸好不好看
  onceSub(name: string, listener: Listener) {
    this.channel.add(name, {
      id: this.subId,
      listener,
      once: false,
    });
  }
}

