const query = require("../db");

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
    const data = [from_user, to_user, to_user, from_user, start, count];
    const _sql = `select from_user,to_user,message,time from private_msg where (from_user = ? and to_user = ? ) or (from_user = ?  and to_user = ? ) order by  time desc limit ?,?`;
    return query(_sql, data);
  },

  /**
   * 插入聊天信息
   * @param {int} from_user 用户自己的id,数据库中的id号
   * @param {int} to_user 私聊对象的id
   * @param {string} msg 聊天信息
   * @param {char} time 时间
   */
  insertMsg({ from_user, to_user, msg, time }) {
    const data = [from_user, to_user, msg, time];
    const _sql = `INSERT INTO private_msg(from_user,to_user,message,time) VALUES(?,?,?,?)`;
    return query(_sql, data);
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
    const data = [from_user, from_user, start, count];
    // FIXME
    const _sql = `select * from private_msg where (from_user = ? or to_user = ? ) order by  id desc limit ?,?`;
    return query(_sql, data);
  },
  /**
   * 保存私人聊天信息
   * @param {int} from_user 用户自己的id,数据库中的id号
   * @param {int} to_user 私聊对象的id
   * @param {string} msg 聊天信息
   * @param {char} time 时间
   */
  savePrivateMsg({ from_user, to_user, message, time }) {
    const data = [from_user, to_user, message, time];
    const _sql =
      " INSERT INTO private_msg(from_user,to_user,message,time)  VALUES(?,?,?,?); ";
    return query(_sql, data);
  },

  // 建群
  createGroup(arr) {
    const _sql =
      "INSERT INTO group_info (to_group_id,name,group_notice,creator_id,create_time) VALUES (?,?,?,?,?)";
    return query(_sql, arr);
  },
  getGroupMsg(groupId, start, count) {
    const _sql =
      "SELECT * FROM (SELECT g.message,g.attachments,g.time,g.from_user,g.to_group_id, i.github_id FROM group_msg  As g inner join user_info AS i ON g.from_user = i.id  WHERE to_group_id = ? order by time desc limit ?,?) as n order by n.time; ";
    return query(_sql, [groupId, start, count]);
  },

  /**
   * 群添加成员并返回群成员
   * @param   user_id  用户id
   * @param   groupId 群id
   * @return
   */
  joinGroup(user_id, to_group_id) {
    const _sql =
      "INSERT INTO group_user_relation(user_id,to_group_id) VALUES(?,?)";
    return query(_sql, [user_id, to_group_id]);
  },
  // 查看某个用户是否在某个群中
  isInGroup(user_id, to_group_id) {
    const _sql =
      "SELECT * FROM group_user_relation WHERE user_id = ? AND to_group_id = ?";
    return query(_sql, [user_id, to_group_id]);
  },
  // 更新群信息

  updateGroupInfo({ name, group_notice, to_group_id }) {
    const _sql =
      "UPDATE group_info SET name = ?, group_notice = ? WHERE to_group_id= ? limit 1  ";
    return query(_sql, [name, group_notice, to_group_id]);
  },
  // 退群
  leaveGroup(user_id, to_group_id) {
    const _sql =
      "DELETE FROM group_user_relation WHERE user_id = ? AND to_group_id = ? ;";
    return query(_sql, [user_id, to_group_id]);
  },

  /**
   * 存聊天记录
   * @param   user_id  用户id
   * @param   groupId 群id
   * @param   message  消息
   * @param   name 用户名
   * @param   time  时间
   * @return
   */

  saveGroupMsg({ from_user, to_group_id, message, time, attachments }) {
    const data = [from_user, to_group_id, message, time, attachments];
    const _sql =
      " INSERT INTO group_msg(from_user,to_group_id,message ,time, attachments) VALUES(?,?,?,?,?); ";
    return query(_sql, data);
  },

  getUnreadCount({ sortTime, to_group_id }) {
    const data = [sortTime, to_group_id];
    const _sql =
      "SELECT count(time) as unread FROM group_msg as p where p.time > ? and p.to_group_id = ?;";
    return query(_sql, data);
  },
  /**
   * 获取群资料
   * @param   arr 包括 groupId  groupName 至少一个
   * @return
   */
  getGroupInfo(arr) {
    const _sql =
      "SELECT to_group_id, name, group_notice, creator_id, create_time FROM group_info  WHERE to_group_id = ? OR name = ? ;";
    return query(_sql, arr);
  },
  /**
   * 获取群成员
   * @param   群id
   * @return  group_member_id  群成员id
   */
  getGroupMember(groupId) {
    const _sql =
      "SELECT g.user_id, u.socketid, u.github_id, u.github FROM group_user_relation AS g inner join user_info AS u ON g.user_id = u.id WHERE to_group_id = ?";
    return query(_sql, groupId);
  }, 
  /**
   * 获取群消息
   * @param  群id
   * @return  message 群消息
   * @return  time  时间
   * @return  from_user  发送人id
   *  @return  avatar  发送人头像
   */
  getGroupMsg(groupId, start, count) {
    const _sql =
      "SELECT * FROM (SELECT g.message,g.attachments,g.time,g.from_user,g.to_group_id, i.github_id FROM group_msg  As g inner join user_info AS i ON g.from_user = i.id  WHERE to_group_id = ? order by time desc limit ?,?) as n order by n.time";
    return query(_sql, [groupId, start, count]);
  },
  // 模糊匹配用户
  fuzzyMatchGroups(name) {
    const _sql = `
      SELECT * FROM group_info WHERE name LIKE '%?%' or to_group_id like '%?%'
    `;
    return query(_sql, [name, name]);
  }
};

module.exports = ChatInfo;
