// 事件总线
// 这里感觉 不要结合 IndexDB 解耦一下indexDB 后续 还可以改为其他 操作数据的接口
// 这里应该有 两个事件通道

// 主要是为了解决 发消息的问题 可能有消息没有收到 ，比如 你刚进来 监听到一个错误 但是你的Worker 还没有初始化
// (1) Worker -> Main (2) Main -> Worker
// (2) Main   监听到所有需要存储的就 进EventChannel 等待Worker 初始化后在进行
// (3) Worker 把需要发送的数据 进 EventChannel ,Main

// 就应该直接大写 定义常量 后续就直接用了....
export type ChannelName = "MAIN" | "WORKER" | "IDLE";
export const MAINCHANNEL = "MAIN";
export const WOERKERCHANNEL = "WORKER";
export const IDLECHANNEL = "IDLE";
// 单向数据流 ? 永远只有 发布者 告诉 订阅者 信息
// 发布订阅 -> 发布 ----> channel -----> 订阅者

export default class EventChannel {
  channel: Map<ChannelName, Function[]>;
  // publisher: Publisher;
  // subscriber: Subscriber;

  constructor() {
    this.channel = new Map<ChannelName, Function[]>();
    this.channel.set(MAINCHANNEL, []);
    this.channel.set(WOERKERCHANNEL, []);
    this.channel.set(IDLECHANNEL, []);
    // this.publisher = new Publisher();
    // this.subscriber = new Subscriber();
  }

  // 订阅一手咨询
  subscribe(channelName: ChannelName, callBack: Function) {
    const currentChannel = this.channel.get(channelName);
    currentChannel.push(callBack);
  }

  // 发布通知
  publish(ChannelName: ChannelName) {
    const currentChannel = this.channel.get(ChannelName);
    currentChannel.forEach((val) => {
      val();
    });
  }
}
export const channel = new EventChannel();
