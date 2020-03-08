const sql = require('sql-template-strings');
const uuid = require('uuid/v4');
const db = require('./db');

module.exports = {
  async create(vocabularyID, entryID) {
    if (!vocabularyID || !entryID) {
      return null;
    }
    await db.query(sql`
      INSERT INTO vocabularies_entries (vocabulary_id, entry_id)
        VALUES (${vocabularyID}, ${entryID});
    `);
    return vocabularyID + entryID;
  },
  async find(vocabularyID, userID) {
    const { rows } = await db.query(sql`
      SELECT
        id,
        reference_number,
        lemma,
        body
      FROM
         entries
      INNER JOIN vocabularies_users ON vocabularies_users.vocabulary_id = ${vocabularyID} AND user_id = ${userID}
      INNER JOIN vocabularies_entries ON vocabularies_entries.vocabulary_id = ${vocabularyID} AND entry_id = id;
    `);
    return rows;
  },
  async delete(vocabularyID, entryID, userID) {
    await db.query(sql`
      DELETE FROM vocabularies_organizations WHERE vocabulary_id = ${vocabularyID} AND entry_id = ${entryID};
    `);
  }
};
