import { Context } from "../index";

export function patchVue(context: Context, Vue: any) {
  Vue.config.errorHandler = function (err: any, vm: any, info: any) {
    console.log(`Error: ${err.toString()}\nInfo: ${info}`);
  };
}
