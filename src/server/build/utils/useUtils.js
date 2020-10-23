"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLogger = exports.useTerminal = void 0;
const koa_logger_1 = __importDefault(require("koa-logger"));
const chalk_1 = __importDefault(require("chalk"));
const str = `_____              
|  _ \\ _   _ _ __  
| |_) | | | |  _ \\ 
|  _ <| |_| | | | |
|_| \\_\\\\__,_|_| |_|`;
function useTerminal() {
    console.log(chalk_1.default.bold.magenta(str));
    console.log('');
    console.log(`app is Listen ${chalk_1.default.bold.red(5000)}`);
}
exports.useTerminal = useTerminal;
function useLogger() {
    return koa_logger_1.default({
        transporter: (str, args) => {
            const [, methods, url, status, time] = args;
            // console.log(methods, url, status, time, str)
            // 洋葱模型之 搞两次?
            if (!status) {
                return;
            }
            const date = new Date().toLocaleString();
            const statusStr = parseInt(status, 10) > 200 || parseInt(status, 10) < 304 ? chalk_1.default.green(status) : chalk_1.default.red(status);
            console.log(`[${chalk_1.default.cyan(date)}]`, chalk_1.default.yellow(methods), statusStr, time, url);
        }
    });
}
exports.useLogger = useLogger;
