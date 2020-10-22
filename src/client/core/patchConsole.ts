export default function patchConsole(context: any) {
  // console.log(context,"Console");
  const originConsole = console.error;
  console.error = function (args: any[]) {
    console.log(args);
    return originConsole.call(this, arguments);
  };
}
