import { Context } from "../index";

export function patchVue(context: Context, Vue: any) {
  console.log("patchVue", Vue);
  Vue.config.errorHandler = function (err: any, vm: any, info: any) {
    console.log(`Error: ${err.toString()}\nInfo: ${info}`);
  };
}
