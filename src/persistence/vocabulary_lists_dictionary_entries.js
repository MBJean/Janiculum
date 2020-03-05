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
  async delete(vocabularyListID, dictionaryEntryID) {
    await db.query(sql`
    DELETE FROM vocabulary_lists_organizations WHERE vocabulary_list_id = ${vocabularyListID} AND dictionary_entry_id = ${dictionaryEntryID};
    `);
  }
};
