const sql = require('sql-template-strings')
const uuid = require('uuid/v4')
const db = require('./db')

module.exports = {
  async create(body, stem_id) {
    if (!body || !stem_id) {
      return null
    }
    const id = uuid()
    await db.query(sql`
    INSERT INTO senses (id, body, stem_id)
      VALUES (${id}, ${body}, ${stem_id});
    `)
    return id
  },
}
