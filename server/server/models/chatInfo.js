const query = require('../db')

const ChatInfo = {

  /**
   * 获取私人聊天信息
   * @param {int} from_user 用户自己的id,数据库中的id号
   * @param {int} to_user 私聊对象的id
   * @param {int} start 聊天记录中开始的索引
   * @param {int} count 聊天信息个数
   * @return  from_user 
   *          to_user 
   *          message 
   *          time 
   */
  getPrivateMsg(from_user, to_user, start = 0, count = 20) {
    const data = [from_user, to_user, to_user, from_user, start, count]
    const _sql = `select from_user,to_user,message,time from private_msg where (from_user = ? and to_user = ? ) or (from_user = ?  and to_user = ? ) order by  time desc limit ?,?`
    return query(_sql, data)
  },

  /**
   * 插入聊天信息
   * @param {int} from_user 用户自己的id,数据库中的id号
   * @param {int} to_user 私聊对象的id
   * @param {string} msg 聊天信息 
   * @param {char} time 时间
   */
  insertMsg({ from_user, to_user, msg, time }) {
    const data = [from_user, to_user, msg, time]
    const _sql = `INSERT INTO private_msg(from_user,to_user,message,time) VALUES(?,?,?,?)`
    return query(_sql, data)
  },
  /**
   * 获取所有私人聊天信息
   * @param {int} from_user 用户自己的id,数据库中的id号
   * @param {int} start 聊天记录中开始的索引
   * @param {int} count 聊天信息个数
   * @return  from_user 
   *          to_user 
   *          message 
   *          time 
   */
  getAllPrivateMsg(from_user, start = 0, count = 10) {
    const data = [from_user, from_user, start, count]
    // FIXME
    const _sql = `select * from private_msg where (from_user = ? or to_user = ? ) order by  id desc limit ?,?`
    return query(_sql, data)
  },
  // 
  sendPrivateMsg({from_user,to_user,message,time}) {
    const data = [from_user, to_user, message, time];
    const _sql = ' INSERT INTO private_msg(from_user,to_user,message,time)  VALUES(?,?,?,?); ';
    return query(_sql, data);
  }
}

module.exports = ChatInfo