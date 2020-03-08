const sql = require('sql-template-strings');
const db = require('../db');

module.exports = {
  async hasViewAccess(userID) {
    const { rows: hasListAccess } = await db.query(sql`
      SELECT
        id
      FROM
        users
      INNER JOIN vocabularies_users ON vocabulary_id = ${userID} AND user_id = id;
    `);
    const { rows: hasOrganizationAccess } = await db.query(sql`
      SELECT
        id
      FROM
        users
      INNER JOIN organizations_users ON user_id = id
      INNER JOIN vocabularies_organizations ON vocabulary_id = ${userID};
    `);
    return hasListAccess || hasOrganizationAccess;
  }
};
