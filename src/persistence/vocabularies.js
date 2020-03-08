const sql = require('sql-template-strings');
const uuid = require('uuid/v4');
const db = require('./db');

module.exports = {
  async createForUser(name, description = null, userID) {
    if (!name || !userID) {
      return null;
    }
    const id = uuid();
    const {rows} = await db.query(sql`
    INSERT INTO vocabularies (id, name, description)
      VALUES (${id}, ${name}, ${description})
      RETURNING id, name, description;
    `);
    await db.query(sql`
    INSERT INTO vocabularies_users (vocabulary_id, user_id, admin)
      VALUES (${id}, ${userID}, true);
    `);
    return rows[0];
  },
  async createForOrganization(name, description = null, organizationID) {
    if (!name || !organizationID) {
      return null;
    }
    const id = uuid();
    await db.query(sql`
    INSERT INTO vocabularies (id, name, description)
      VALUES (${id}, ${name}, ${description});
    `);
    await db.query(sql`
    INSERT INTO vocabularies_organizations (vocabulary_id, organization_id)
      VALUES (${id}, ${organizationID}, true);
    `);
    return id;
  },
  async delete(id) {
    await db.query(sql`
    DELETE FROM vocabularies WHERE id = ${id};
    `);
  }
};
