// 比较简单的封装了一下
export default class Store {
  constructor() {}
  remove(key: string) {
    localStorage.removeItem(key);
  }
  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  get(key: string) {
    return localStorage.getItem(key);
  }
}
