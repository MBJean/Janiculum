const sql = require('sql-template-strings');
const uuid = require('uuid/v4');
const db = require('./db');
const Session = require('./sessions');

module.exports = {
  async create(name, description = null, userID) {
    if (!name || !userID) {
      return null;
    }
    const id = uuid();
    await db.query(sql`
    INSERT INTO organizations (id, name, description)
      VALUES (${id}, ${name}, ${description});
    `);
    await db.query(sql`
    INSERT INTO organizations_users (organization_id, user_id, admin)
      VALUES (${id}, ${userID}, true);
    `);
    return id;
  },
  async add_user(organizationID, userID, admin = false) {
    if (!organizationID || !userID) {
      return null;
    }
    await db.query(sql`
    INSERT INTO organizations_users (organization_id, user_id, admin)
      VALUES (${organizationID}, ${userID}, ${admin});
    `);
    return organizationID + userID;
  },
  async remove_user(organizationID, userID) {
    await db.query(sql`
    DELETE FROM organizations_users WHERE organization_id = ${id} AND user_id = ${userID};
    `);
  },
  async delete_organization(id) {
    await db.query(sql`
    DELETE FROM organizations WHERE id = ${id};
    `);
  }
};
