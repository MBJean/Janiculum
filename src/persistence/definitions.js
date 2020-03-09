const sql = require('sql-template-strings')
const uuid = require('uuid/v4')
const db = require('./db')

module.exports = {
  async create(entry_id, reference_number, level, body) {
    if (!reference_number || !level || !body) {
      return null
    }
    const id = uuid()
    await db.query(sql`
    INSERT INTO definitions (id, entry_id, reference_number, level, body)
      VALUES (${id}, ${entry_id}, ${reference_number}, ${level}, ${body});
    `)
    return id
  },
  async find(id) {
    const { rows } = await db.query(sql`
    SELECT * FROM definitions WHERE id = ${id};
    `)
    return rows.map(definition => ({
      referenceNumber: definition.reference_number,
      level: definition.level,
      body: definition.body,
    }))
  },
  async delete(id) {
    await db.query(sql`
    DELETE FROM definitions WHERE id = ${id};
    `)
  },
}
