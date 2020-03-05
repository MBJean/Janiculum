const sql = require('sql-template-strings');
const uuid = require('uuid/v4');
const db = require('./db');

module.exports = {
  async create(vocabularyListID, dictionaryDefinitionID) {
    if (!vocabularyListID || !dictionaryDefinitionID) {
      return null;
    }
    await db.query(sql`
    INSERT INTO vocabulary_lists_dictionary_entries (vocabulary_list_id, dictionary_definition_id)
      VALUES (${vocabularyListID}, ${dictionaryDefinitionID});
    `);
    return vocabularyListID + dictionaryDefinitionID;
  },
  async delete(vocabularyListID, dictionaryDefinitionID) {
    await db.query(sql`
    DELETE FROM vocabulary_lists_organizations WHERE vocabulary_list_id = ${vocabularyListID} AND dictionary_definition_id = ${dictionaryDefinitionID};
    `);
  }
};
