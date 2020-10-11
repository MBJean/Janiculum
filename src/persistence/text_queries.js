const sql = require('sql-template-strings')
const uuid = require('uuid/v4')
const db = require('./db')

module.exports = {
  async create(text_id, body, response) {
    if (!text_id || !body || !response) {
      return null
    }
    const id = uuid()
    await db.query(sql`
    INSERT INTO text_queries (id, text_id, body, response)
      VALUES (${id}, ${text_id}, ${body}, ${response});
    `)
    return id
  },
  async find(id) {
    const { rows } = await db.query(sql`
    SELECT * FROM text_queries WHERE id = ${id};
    `)
    return rows[0]
  },
  async search(text_id, body) {
    const { rows } = await db.query(sql`
    SELECT * FROM text_queries WHERE text_id = ${text_id} AND body = ${body};
    `)
    return rows[0]
  },
  async delete(id) {
    await db.query(sql`
    DELETE FROM text_queries WHERE id = ${id};
    `)
  },
}
