import fs from "fs";
import path from "path";

import Router from "koa-router";
const router = new Router();
import { errorController } from "../controller/errorController";
import { trackController } from "../controller/trackController";


// 直接上报错误的接口
// 解决那个 Mime的问题
router.get("/error/:jpg", async (ctx, next) => {
  const query = ctx.query;
  const filePath = fs.readFileSync(
    path.join(__dirname, "../../src/public/images.jpg")
  ); // 要返回一个对应的jpg
  errorController(query);
  ctx.body = filePath;
  ctx.type = "image/jpg";
});

router.post("/postError", async (ctx, next) => {
  // await next();
  const params = ctx.request.body;
  console.log(params);
  ctx.body = JSON.stringify({ res: "ok" });
});

router.get("/test", async (ctx, next) => {
  await next();
  ctx.body = JSON.stringify({ RES: "GET OK" });
});

router.post("/test", async (ctx, next) => {
  ctx.body = JSON.stringify({ RES: "POST OK" });
});
export { router };
