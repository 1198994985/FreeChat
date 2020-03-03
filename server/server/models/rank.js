const query = require("../db");

const rankInfo = {
  insertRankItem(res) {
    const {
      rankIndex,
      musicURL,
      musicName,
      during,
      author,
      authorId,
      rankId
    } = res;
    const sql = `INSERT INTO rank(rankIndex, musicURL, musicName, during, author, authorId, rankId) VALUES(?,?,?,?,?,?,?)`;
    return query(sql, [
      rankIndex,
      musicURL,
      musicName,
      during,
      author,
      authorId,
      rankId
    ]);
  }
};
module.exports = rankInfo;
