"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const router = new koa_router_1.default();
exports.router = router;
const errorController_1 = require("../controller/errorController");
const trackController_1 = require("../controller/trackController");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// 直接上报错误的接口
// 解决那个 Mime的问题
router.get("/error/:jpg", async (ctx, next) => {
    const query = ctx.query;
    // console.log(query)
    const filePath = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../src/public/images.jpg")); // 要返回一个对应的jpg
    console.log(query.tableName);
    if (query.tableName === "error") {
        errorController_1.errorController(query);
    }
    else if (query.tableName === "track") {
        trackController_1.trackController(query);
    }
    ctx.body = filePath;
    ctx.type = "image/jpg";
});
router.get("/test", async (ctx, next) => {
    ctx.body = JSON.stringify({ RES: "GET OK" });
});
router.post("/test", async (ctx, next) => {
    ctx.body = JSON.stringify({ RES: "POST OK" });
});
