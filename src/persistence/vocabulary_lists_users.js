const sql = require('sql-template-strings');
const uuid = require('uuid/v4');
const db = require('./db');

module.exports = {
  async create(vocabularyListID, userID, admin = false) {
    if (!vocabularyListID || !userID) {
      return null;
    }
    await db.query(sql`
    INSERT INTO vocabulary_lists_users (vocablary_list_id, user_id, admin)
      VALUES (${vocabularyListID}, ${userID}, ${admin});
    `);
    return vocabularyListID + userID;
  },
  async delete(vocabularyListID, userID) {
    await db.query(sql`
    DELETE FROM vocabulary_lists_users WHERE vocablary_list_id = ${vocabularyListID} AND user_id = ${userID};
    `);
  }
};
