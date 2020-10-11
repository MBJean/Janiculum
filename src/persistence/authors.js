const sql = require('sql-template-strings')
const uuid = require('uuid/v4')
const db = require('./db')

module.exports = {
  async find_or_create(name, display_name) {
    if (!name || !display_name) {
      return null
    }
    const existingAuthor = await this.search(name)
    if (existingAuthor) return existingAuthor.id
    const id = uuid()
    await db.query(sql`
    INSERT INTO authors (id, name, display_name)
      VALUES (${id}, ${name}, ${display_name});
    `)
    return id
  },
  async find(id) {
    const { rows } = await db.query(sql`
    SELECT * FROM authors WHERE id = ${id};
    `)
    return rows[0]
  },
  async search(name) {
    const { rows } = await db.query(sql`
    SELECT * FROM authors WHERE name = ${name};
    `)
    return rows[0]
  },
  async delete(id) {
    await db.query(sql`
    DELETE FROM authors WHERE id = ${id};
    `)
  },
}
