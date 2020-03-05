const sql = require('sql-template-strings');
const uuid = require('uuid/v4');
const db = require('./db');
const { hasViewAccess } = require('./helpers/vocabulary_lists_helpers');

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
  async find(vocabularyListID, userID) {
    if (!hasViewAccess(userID)) return null;
    const { rows } = await db.query(sql`
      SELECT
         id,
         reference_number,
         level,
         body
      FROM
         dictionary_definitions
      INNER JOIN vocabulary_lists_dictionary_definitions ON vocabulary_list_id = ${vocabularyListID} AND dictionary_definition_id = id;
    `);
    console.log(rows);
    return rows;
  },
  async delete(vocabularyListID, dictionaryDefinitionID, userID) {
    if (!hasViewAccess(userID)) return null;
    await db.query(sql`
      DELETE FROM vocabulary_lists_organizations WHERE vocabulary_list_id = ${vocabularyListID} AND dictionary_definition_id = ${dictionaryDefinitionID};
    `);
  }
};
