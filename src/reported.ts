// // 上报不需要ajax  直接使用 一张图片 get请求就可以额
// // 不会阻塞页面加载，不会影响用户体验
// // 相比BMP/PNG体积最小，可以节约网络资源

// // ******暂时 作废***********
// let BaseUrl = "http://localhost:3000/record";

// interface Data {
//   [key: string]: any;
// }
// let defaultConfig: RequestInit = {
//   headers: {
//     "Content-Type": "application/json",
//   },
//   cache: "force-cache",
//   method: "GET",
// };
// export async function useReported(data: Data, url: string, methods = "GET") {
//   methods = methods.toUpperCase();
//   url = BaseUrl + url;
//   if (methods === "GET") {
//     let dataStr = "";
//     Object.keys(data).forEach((key) => {
//       dataStr += key + "=" + data[key] + "&";
//     });
//     if (dataStr !== "") {
//       dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
//       url = url + "?" + dataStr;
//     }
//   }
//   if (methods === "POST" || methods === "PUT" || methods === "DELETE") {
//     Object.defineProperty(defaultConfig, "body", {
//       value: JSON.stringify(data),
//       configurable: true,
//       enumerable: true,
//     });
//     defaultConfig.method = methods;
//   }

//   // 这里就不需要返回了 直接上报即可
//   await fetch(url, defaultConfig);
// }

