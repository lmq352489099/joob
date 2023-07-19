//server/utils/db/mysql/index.ts
// 导入模块
import mysql from 'mysql2'
// 创建连接池，设置连接池的参数
export const getDB = () => {
  return mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'jbook',
    password: '123456',
    port: 9306, // 修改端口为映射的 Docker 端口
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }).promise()

}