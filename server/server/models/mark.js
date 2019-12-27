const query = require("../db");

const markInfo = {
  getMarkById(id, type=0,count = 10) {
    const sql = `select id,from_id,msg,time from mvAndSong_mark_msgs where theId = ? and type = ? order by time desc limit ? `;
    return query(sql, [id, type, count]);
  },
  insertMark(theId, from_id, msg,time, type=0) {
    const sql = `INSERT INTO mvAndSong_mark_msgs(theId,from_id,msg,time,type) VALUES(?,?,?,?,?)`;
    return query(sql, [theId, from_id, msg, time, type]);
  },
 
};
module.exports = markInfo;
