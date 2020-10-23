// 暂时不知道 劫持控制 台是什么情况 第三方库 自己的 console.warn? Vue 在生产环境也会tree shake 掉
export default function patchConsole(context: any) {
  // console.log(context,"Console");
  const originConsole = console.error;
  console.error = function (args: any[]) {
    console.log(args);
    return originConsole.call(this, arguments);
  };
}
