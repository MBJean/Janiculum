const sql = require('sql-template-strings')
const uuid = require('uuid/v4')
const db = require('./db')

module.exports = {
  async create(body) {
    if (!body) {
      return null
    }
    const id = uuid()
    await db.query(sql`
    INSERT INTO stems (id, body)
      VALUES (${id}, ${body});
    `)
    return id
  },
  async find(id) {
    const { rows } = await db.query(sql`
    SELECT body FROM stems WHERE id = ${id} LIMIT 1;
    `)

    return rows.map(entry => ({
      body: entry.body,
    }))
  },
}
