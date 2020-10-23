"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = void 0;
// const mysql = require('mysql')
const mysql_1 = __importDefault(require("mysql"));
// 创建数据池
const pool = mysql_1.default.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "track",
});
// 在数据池中进行会话操作
async function useQuery(sql, values) {
    return await new Promise((resolve, reject) => {
        // 在数据池中进行会话操作
        pool.getConnection((err, connection) => {
            // 如果有错误就抛出
            if (err) {
                reject(err);
            }
            else {
                connection.query(sql, [values], (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                    // 结束会话
                    connection.release();
                });
            }
        });
    });
}
exports.useQuery = useQuery;
