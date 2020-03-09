const sql = require('sql-template-strings')
const uuid = require('uuid/v4')
const db = require('./db')

module.exports = {
  async create(vocabularyID, organizationID, admin = false) {
    if (!vocabularyID || !organizationID) {
      return null
    }
    await db.query(sql`
    INSERT INTO vocabularies_organizations (vocabulary_id, organization_id)
      VALUES (${vocabularyID}, ${organizationID});
    `)
    return vocabularyID + organizationID
  },
  async delete(vocabularyID, organizationID) {
    await db.query(sql`
    DELETE FROM vocabularies_organizations WHERE vocabulary_id = ${vocabularyID} AND organization_id = ${organizationID};
    `)
  },
}
