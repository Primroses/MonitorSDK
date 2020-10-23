"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const useUtils_1 = require("./utils/useUtils");
// import Router
const index_1 = require("./routes/index");
const cors_1 = require("./middleware/cors");
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_static_1 = __importDefault(require("koa-static"));
const path_1 = __importDefault(require("path"));
// const debug = require('debug')('app')
// const jsonp = require('koa-jsonp') // 不支持types
// import intercept from './middleware/intercept'
// 创建一个Koa对象表示web app本身:
const app = new koa_1.default(); // 扩展State, Context
// 放在前面才可以
app.use(koa_static_1.default(path_1.default.join(__dirname, './public')));
app.use(cors_1.useCors);
app.use(useUtils_1.useLogger());
app.use(koa_bodyparser_1.default({
    enableTypes: ['json', 'form', 'text']
}));
// app.use(jsonp()) // 装个JSONP插件就可以了？
// app.use(wsIntercept)
// debug()
app.use(index_1.router.routes()).use(index_1.router.allowedMethods());
// 对于任何请求，app将调用该异步函数处理请求：
// 在端口3000监听:
exports.default = app;
