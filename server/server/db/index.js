const mysql = require('mysql')
const { dataBaseConfig } = require('../config.js');

const pool = mysql.createPool(dataBaseConfig)

/**
 * 执行sql语句的函数
 * @param {string} sql 要执行的SQL语句
 * @param {object[]} values 传给SQL语句的参数,可以防止xss攻击
 * 
 * ##### 使用方法
 * ```javascript
 * async function() {
 *   const res = await query(sql, values)
 * }
 * ```
 */
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection)=> {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
          connection.release()
        })
      }
    })
  });
}
module.exports= query