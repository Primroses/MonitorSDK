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

