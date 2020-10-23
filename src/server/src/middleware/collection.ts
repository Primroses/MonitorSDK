// const mysql = require('mysql')
import mysql from "mysql";
// 创建数据池

const pool = mysql.createPool({
  host: "127.0.0.1", // 数据库地址
  user: "root", // 数据库用户
  password: "root", // 数据库密码
  database: "track", // 选中数据库
});

// 在数据池中进行会话操作
export async function useQuery(sql: string, values?: any) {
  return await new Promise((resolve, reject) => {
    // 在数据池中进行会话操作
    pool.getConnection((err, connection) => {
      // 如果有错误就抛出
      if (err) {
        reject(err);
      } else {
        connection.query(sql, [values], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          // 结束会话
          connection.release();
        });
      }
    });
  });
}
