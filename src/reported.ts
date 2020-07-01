let BaseUrl = "http://localhost:3000/record";

interface Data {
  [key: string]: any;
}
let defaultConfig: RequestInit = {
  headers: {
    "Content-Type": "application/json",
  },
  cache: "force-cache",
  method: "GET",
};
export async function useReported(data: Data, url: string, methods = "GET") {
  methods = methods.toUpperCase();
  url = BaseUrl + url;
  if (methods === "GET") {
    let dataStr = "";
    Object.keys(data).forEach((key) => {
      dataStr += key + "=" + data[key] + "&";
    });
    if (dataStr !== "") {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
      url = url + "?" + dataStr;
    }
  }
  if (methods === "POST" || methods === "PUT" || methods === "DELETE") {
    Object.defineProperty(defaultConfig, "body", {
      value: JSON.stringify(data),
      configurable: true,
      enumerable: true,
    });
    defaultConfig.method = methods;
  }
  let state;
  try {
    const response = await fetch(url, defaultConfig);
    state = response.json();
  } catch (error) {
    state = error;
  }
  return state;
}

// export function useAjaxReported(data: Data, methods = "GET") {
//   return new Promise<Response>((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open(methods, BaseUrl);
//     // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhr.setRequestHeader("Content-type", "application/json");
//     // xhr.withCredentials = true;// 不需要凭证
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           // 做一层简单的拦截 不会拦截返回 只会 告诉 错误信息
//           return resolve(JSON.parse(xhr.responseText));
//         } else {
//           return reject(xhr.responseText);
//         }
//       }
//     };
//     xhr.send(JSON.stringify(data));
//   });
// }
