const sql = require('sql-template-strings');
const uuid = require('uuid/v4');
const db = require('./db');

module.exports = {
  async create(vocabularyID, userID, admin = false) {
    if (!vocabularyID || !userID) {
      return null;
    }
    await db.query(sql`
    INSERT INTO vocabularies_users (vocabulary_id, user_id, admin)
      VALUES (${vocabularyID}, ${userID}, ${admin});
    `);
    return {
      id: vocabularyID + userID,
      admin: admin
    };
  },
  async find(userID) {
    const {rows} = await db.query(sql`
      SELECT
         id,
         name,
         description
      FROM
         vocabularies
      INNER JOIN
        vocabularies_users
      ON
        vocabulary_id = id
      WHERE
        vocabularies_users.user_id = ${userID};
    `);
    return rows;
  },
  async delete(vocabularyID, userID) {
    await db.query(sql`
    DELETE FROM vocabularies_users WHERE vocabulary_id = ${vocabularyID} AND user_id = ${userID};
    `);
  }
};
