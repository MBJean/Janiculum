const sql = require('sql-template-strings')
const uuid = require('uuid/v4')
const db = require('./db')

module.exports = {
  async create(name, description = null, userID) {
    if (!name || !userID) {
      return null
    }
    const id = uuid()
    const { rows } = await db.query(sql`
    INSERT INTO vocabularies (id, name, description)
      VALUES (${id}, ${name}, ${description})
      RETURNING id, name, description;
    `)
    await db.query(sql`
    INSERT INTO vocabularies_users (vocabulary_id, user_id, admin)
      VALUES (${id}, ${userID}, true);
    `)
    return rows[0]
  },
  async delete(id) {
    await db.query(sql`
    DELETE FROM vocabularies WHERE id = ${id};
    `)
  },
}
