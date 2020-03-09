const sql = require('sql-template-strings')
const uuid = require('uuid/v4')
const db = require('./db')

module.exports = {
  async create(vocabularyID, definitionID) {
    if (!vocabularyID || !definitionID) {
      return null
    }
    await db.query(sql`
      INSERT INTO vocabularies_entries (vocabulary_id, definition_id)
        VALUES (${vocabularyID}, ${definitionID});
    `)
    return vocabularyID + definitionID
  },
  async find(vocabularyID, userID) {
    const { rows } = await db.query(sql`
      SELECT
         id,
         reference_number,
         level,
         body
      FROM
         definitions
      INNER JOIN
        vocabularies_definitions
      ON
        vocabularies_definitions.definition_id = id
      WHERE
        vocabularies_definitions.vocabulary_id = ${vocabularyID}
      INNER JOIN
        vocabularies_users
      ON
        vocabularies_users.vocabulary_id = vocabularies_definitions.vocabulary_id
      WHERE
        vocabularies_users.userID = ${userID};
    `)
    return rows
  },
  async delete(vocabularyID, definitionID, userID) {
    await db.query(sql`
      DELETE FROM vocabularies_organizations WHERE vocabulary_id = ${vocabularyID} AND definition_id = ${definitionID};
    `)
  },
}
