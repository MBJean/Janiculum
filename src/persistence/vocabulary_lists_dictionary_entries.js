const sql = require('sql-template-strings');
const uuid = require('uuid/v4');
const db = require('./db');

module.exports = {
  async create(vocabularyListID, dictionaryEntryID) {
    if (!vocabularyListID || !dictionaryEntryID) {
      return null;
    }
    await db.query(sql`
      INSERT INTO vocabulary_lists_dictionary_entries (vocabulary_list_id, dictionary_entry_id)
        VALUES (${vocabularyListID}, ${dictionaryEntryID});
    `);
    return vocabularyListID + dictionaryEntryID;
  },
  async find(vocabularyListID, userID) {
    const { rows } = await db.query(sql`
      SELECT
        id,
        reference_number,
        lemma,
        body
      FROM
         dictionary_entries
      INNER JOIN vocabulary_lists_users ON vocabulary_lists_users.vocabulary_list_id = ${vocabularyListID} AND user_id = ${userID}
      INNER JOIN vocabulary_lists_dictionary_entries ON vocabulary_lists_dictionary_entries.vocabulary_list_id = ${vocabularyListID} AND dictionary_entry_id = id;
    `);
    return rows;
  },
  async delete(vocabularyListID, dictionaryEntryID, userID) {
    await db.query(sql`
      DELETE FROM vocabulary_lists_organizations WHERE vocabulary_list_id = ${vocabularyListID} AND dictionary_entry_id = ${dictionaryEntryID};
    `);
  }
};
