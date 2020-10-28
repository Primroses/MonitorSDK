import Router from "koa-router";
const router = new Router();
import { errorController } from "../controller/errorController";
import { trackController } from "../controller/trackController";

import fs from "fs";
import path from "path";
// 直接上报错误的接口
// 解决那个 Mime的问题
router.get("/error/:jpg", async (ctx, next) => {
  const query = ctx.query;
  // console.log(query)
  const filePath = fs.readFileSync(
    path.join(__dirname, "../../src/public/images.jpg")
  ); // 要返回一个对应的jpg
  console.log(query.tableName);
  if (query.tableName === "error") {
    errorController(query);
  } else if (query.tableName === "track") {
    trackController(query);
  }
  ctx.body = filePath;
  ctx.type = "image/jpg";
});

router.get("/test", async (ctx, next) => {
  ctx.body = JSON.stringify({ RES: "OK" });
});

export { router };
