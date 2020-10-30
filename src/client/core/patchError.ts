// error 可以 捕获 error 和 资源加载错误

import { Context } from "../index";
import { Data } from "../data/index";


export default function patchError(context: Context) {
  // 应该不会内部都报错的吧???? 这么拉胯的吗?
  window.addEventListener(
    "error",
    function (e: any) {
      // 判断是否有资源加载错误的....
      let params;
      if (!e.cancelable) {
        var { localName, href, src } = e.target;
        let sourceUrl = "";
        if (localName === "link") {
          sourceUrl = href;
        } else {
          sourceUrl = src;
        }
        // 这些是记录 错误的文件名 文件类型
        params = {
          resourceType: localName,
          sourceUrl,
        };
      } else {
        // 就是脚本发生错误了
        const { lineno, filename, timeStamp, error } = e;
        const message = error ? error.message : e.message;
        const stack = error ? error.stack : "";
        // 第几行 文件名 时间 调用栈
        params = {
          lineno,
          filename,
          // timeStamp,
          message,
          stack,
        };
      }
      // 整合一手 数据
      const data: Data = Object.assign(context.data(), {
        mainType: params.resourceType ? "RESOURCE" : "ERROR",
        data: JSON.stringify(params),
      }); // 覆盖第一个参数
      // 操作数据库 (这种是不是应该马上上报呢?) 发生错误 应该直接上报
      context.request({ ...data, tableName: "error" }, "/error");
    },
    true
  );
}
