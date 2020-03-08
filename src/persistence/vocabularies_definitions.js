const sql = require('sql-template-strings');
const uuid = require('uuid/v4');
const db = require('./db');
const { hasViewAccess } = require('./helpers/vocabularies_helpers');

module.exports = {
  async create(vocabularyID, definitionID) {
    if (!vocabularyID || !definitionID) {
      return null;
    }
    await db.query(sql`
      INSERT INTO vocabularies_entries (vocabulary_id, definition_id)
        VALUES (${vocabularyID}, ${definitionID});
    `);
    return vocabularyID + definitionID;
  },
  async find(vocabularyID, userID) {
    if (!hasViewAccess(userID)) return null;
    const { rows } = await db.query(sql`
      SELECT
         id,
         reference_number,
         level,
         body
      FROM
         definitions
      INNER JOIN vocabularies_definitions ON vocabulary_id = ${vocabularyID} AND definition_id = id;
    `);
    console.log(rows);
    return rows;
  },
  async delete(vocabularyID, definitionID, userID) {
    if (!hasViewAccess(userID)) return null;
    await db.query(sql`
      DELETE FROM vocabularies_organizations WHERE vocabulary_id = ${vocabularyID} AND definition_id = ${definitionID};
    `);
  }
};
