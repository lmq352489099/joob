import { getDB } from "~/server/utils/db/mysql";
import { defineEventHandler } from 'h3';

// getDB().getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query('SELECT * FROM users', (error, results) => {
//         connection.release();
//         if (error) throw error;
//         console.log(33333,results);
//     });
// });
export default defineEventHandler(async () => {
  const db = getDB();
  console.log('db :>> ', db);
  try {
    const [rows, fields] = await db.query('SELECT * FROM `users`');
    console.log(123455, rows);
    return {rows,fields}
  } finally {
  }
});