/// <reference path="./node_modules/@types/jest/index.d.ts" />
interface IModule {
  define: (name: string, deps: string[] | string, factory: Function) => void;
  require: (deps: string[] | string, factory: Function) => void;
}
declare module "*.tmp" {
  const content: Function;
  export default content;
}

