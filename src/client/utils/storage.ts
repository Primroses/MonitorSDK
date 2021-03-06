// 比较简单的封装了一下
export class Store {
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

export const store = new Store();
