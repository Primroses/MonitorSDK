#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const chalk_1 = __importDefault(require("chalk"));
const app_1 = __importDefault(require("../app"));
let port = 5000;
const server = http_1.default.createServer(app_1.default.callback());
server.on("error", (e) => {
    if (e.code === "EADDRINUSE") {
        console.log(`Port ${port} is in use, trying another one...`);
        setTimeout(() => {
            server.close();
            server.listen(++port);
        }, 100);
    }
    else {
        console.error(chalk_1.default.red("[Koa Server] server error:"));
        console.error(e);
    }
});
server.on("listening", () => {
    console.log(`It is run on ${port}`);
});
server.listen(port);
