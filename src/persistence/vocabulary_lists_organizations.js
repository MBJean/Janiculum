const sql = require('sql-template-strings');
const uuid = require('uuid/v4');
const db = require('./db');

module.exports = {
  async create(vocabularyListID, organizationID, admin = false) {
    if (!vocabularyListID || !organizationID) {
      return null;
    }
    await db.query(sql`
    INSERT INTO vocabulary_lists_organizations (vocabulary_list_id, organization_id)
      VALUES (${vocabularyListID}, ${organizationID});
    `);
    return vocabularyListID + organizationID;
  },
  async delete(vocabularyListID, organizationID) {
    await db.query(sql`
    DELETE FROM vocabulary_lists_organizations WHERE vocabulary_list_id = ${vocabularyListID} AND organization_id = ${organizationID};
    `);
  }
};
