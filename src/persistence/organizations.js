const sql = require('sql-template-strings')
const uuid = require('uuid/v4')
const db = require('./db')

module.exports = {
  async create(name, description = null, userID) {
    if (!name || !userID) {
      return null
    }
    const id = uuid()
    await db.query(sql`
    INSERT INTO organizations (id, name, description)
      VALUES (${id}, ${name}, ${description});
    `)
    await db.query(sql`
    INSERT INTO organizations_users (organization_id, user_id, admin)
      VALUES (${id}, ${userID}, true);
    `)
    return id
  },
  async delete(id) {
    await db.query(sql`
    DELETE FROM organizations WHERE id = ${id};
    `)
  },
}
