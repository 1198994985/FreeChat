const query = require('../db')

const UserInfo = {

  // 查找用户
  findAccount(account) {
    const _sql = 'select account from user_info where account = ?'
    return query(_sql, account)
  },

  // 根据账户查找密码
  findPassWord(account) {
    const _sql = 'select password from user_info where account = ?'
    return query(_sql, account)
  },

  // 查找用户密码
  findActPwd(account) {
    const _sql = 'select id,account,password from user_info where account = ?'
    return query(_sql, account)
  },

  // 注册用户
  insertUser(account, password) {
    const _sql = 'insert into user_info(account,password) values(?,?)'
    return query(_sql, [account, password])
  },

  // 查找用户信息,用于搜索好友
  findDataByAccount(account) {
    const _sql = 'select id,github_id,account,github from user_info where account = ?'
    return query(_sql, account)
  },

  // 登陆时，获取用户个人信息by id
  getUserInfoById(id) {
    const _sql = 'select id,github_id,account,github from user_info where id = ?'
    return query(_sql, id)
  },

  // 登陆时，获取用户个人信息by account
  getUserInfoByAccount(account) {
    const _sql = 'select id,github_id,account,github from user_info where account = ?'
    return query(_sql, account)
  },

  // 通过要查看的用户id 查询是否是本机用户的好友  如果是 返回user_id 和 remark 备注
  isFriend(user_id, from_user) {
    const _sql = 'SELECT  * FROM user_relation  AS u WHERE  u.user_id = ? AND u.from_user = ? ';
    return query(_sql, [user_id, from_user]);
  },
  // 两边都互加为好友
  addFriendEachOther(user_id, from_user, time) {
    const _sql = 'INSERT INTO user_relation(user_id,from_user,time) VALUES (?,?,?), (?,?,?)';
    return query(_sql, [user_id, from_user, time, from_user, user_id, time]);
  },

  // 每次登录保存socket
  saveUserSocketId(user_id, socketId) {
    const _sql = ' UPDATE  user_info SET socketid = ? WHERE id= ? limit 1 ; ';
    return query(_sql, [socketId, user_id]);
  },

  /**
   * 获取用户socket
   * @param {int} toUserId 用户的id号
   */
  getUserSocketId(toUserId) {
    const _sql = ' SELECT socketid FROM user_info WHERE id=? limit 1 ;';
    return query(_sql, [toUserId]);
  },

  /**
   * 获取私聊列表
   * @param {int} user_id 数据库中的id号码
   * @return {object} 返回私聊列表
   */
  getPrivateList(user_id) {
    const _sql = ` SELECT r.from_user as user_id, i.account, r.time as be_friend_time,
    (SELECT p.message FROM private_msg AS p WHERE (p.to_user = r.from_user and p.from_user = r.user_id) or (p.from_user = r.from_user and p.to_user = r.user_id) ORDER BY p.time DESC   LIMIT 1 )  AS message ,
    (SELECT p.time FROM private_msg AS p WHERE (p.to_user = r.from_user and p.from_user = r.user_id) or (p.from_user = r.from_user and p.to_user = r.user_id) ORDER BY p.time DESC   LIMIT 1 )  AS time
    FROM  user_relation AS r inner join user_info AS i on r.from_user  = i.id WHERE r.user_id = ? or r.from_user= ?`
    
    return query(_sql, [user_id, user_id]);
  }

}

module.exports = UserInfo
