const sql = require('sql-template-strings');
const db = require('../db');

module.exports = {
  async checkAdminAccess(vocabularyID, userID) {
    const { rows } = await db.query(sql`
      SELECT
        id
      FROM
        users
      INNER JOIN
        vocabularies_users
      ON
        user_id = id
      WHERE
        vocabulary_id = ${vocabularyID}
      AND
        user_id = ${userID}
      AND
        admin = true;
    `);
    return rows.length > 0;
  },
  async checkViewAccess(vocabularyID, userID) {
    const { rows } = await db.query(sql`
      SELECT
        id
      FROM
        users
      INNER JOIN
        vocabularies_users
      ON
        user_id = id
      WHERE
        vocabulary_id = ${vocabularyID}
      AND
        user_id = ${userID};
    `);
    return rows.length > 0;
  }
};
