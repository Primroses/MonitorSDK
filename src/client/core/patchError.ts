// error 可以 捕获 error 和 资源加载错误
export default function patchError(context: any) {
  window.addEventListener(
    "error",
    function (e: any) {
      // 判断是否有资源加载错误的....
      let data;
      if (!e.cancelable) {
        var { localName, href, src } = e.target;
        let sourceUrl = "";
        if (localName === "link") {
          sourceUrl = href;
        } else {
          sourceUrl = src;
        }
        // 这些是记录 错误的文件名 文件类型
        const params = {
          resourceType: localName,
          sourceUrl,
        };
        console.log(params)
      } else {
        // 就是脚本发生错误了
        const { lineno, filename, timeStamp, error } = e;
        const message = error ? error.message : e.message;
        const stack = error ? error.stack : "";
        // 第几行 文件名 时间 调用栈
        const params = {
          lineno,
          filename,
          timeStamp,
          message,
          stack,
        };
        console.log(params)
      }
    },
    true
  );
}
