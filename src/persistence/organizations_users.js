const sql = require('sql-template-strings');
const uuid = require('uuid/v4');
const db = require('./db');

module.exports = {
  async create(organizationID, userID, admin = false) {
    if (!organizationID || !userID) {
      return null;
    }
    await db.query(sql`
    INSERT INTO organizations_users (organization_id, user_id, admin)
      VALUES (${organizationID}, ${userID}, ${admin});
    `);
    return organizationID + userID;
  },
  async delete(organizationID, userID) {
    await db.query(sql`
    DELETE FROM organizations_users WHERE organization_id = ${organizationID} AND user_id = ${userID};
    `);
  }
};
