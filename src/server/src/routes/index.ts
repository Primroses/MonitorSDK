import Router from "koa-router";
const router = new Router();
import { errorController } from "../controller/errorController";

import fs from "fs";
import path from "path";
// 直接上报错误的接口
// 解决那个 Mime的问题
router.get("/error/:jpg", async (ctx, next) => {
  const query = ctx.query;
  const filePath = fs.readFileSync(
    path.join(__dirname, "../../src/public/images.jpg")
  ); // 要返回一个对应的jpg

  if (query) {
    errorController(query);
  }
  ctx.body = filePath;
  ctx.type = "image/jpg";
});

export { router };
