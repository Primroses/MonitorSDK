"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const koa_router_1 = __importDefault(require("koa-router"));
const router = new koa_router_1.default();
exports.router = router;
const errorController_1 = require("../controller/errorController");
// 直接上报错误的接口
// 解决那个 Mime的问题
router.get("/error/:jpg", async (ctx, next) => {
    const query = ctx.query;
    const filePath = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../src/public/images.jpg")); // 要返回一个对应的jpg
    errorController_1.errorController(query);
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
