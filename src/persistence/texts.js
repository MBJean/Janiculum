const sql = require('sql-template-strings')
const uuid = require('uuid/v4')
const db = require('./db')

module.exports = {
  async find_or_create(author_id, title, display_title, body) {
    if (!author_id || !title || !display_title || !body) {
      return null
    }
    const existingText = await this.search(author_id, title)
    if (existingText) return existingText.id
    const id = uuid()
    await db.query(sql`
    INSERT INTO texts (id, author_id, title, display_title, body)
      VALUES (${id}, ${author_id}, ${title}, ${display_title}, ${body});
    `)
    return id
  },
  async find(id) {
    const { rows } = await db.query(sql`
    SELECT * FROM texts WHERE id = ${id};
    `)
    return rows[0]
  },
  async search(author_id, title) {
    const { rows } = await db.query(sql`
    SELECT * FROM texts WHERE author_id = ${author_id} AND title = ${title};
    `)
    return rows[0]
  },
  async query(id, xpathQuery) {
    const { rows } = await db.query(
      'SELECT xpath($1, body)::varchar[] FROM public.texts WHERE id = $2',
      [xpathQuery, id]
    )
    console.log(rows[0].xpath)
    return rows[0].xpath
  },
  async delete(id) {
    await db.query(sql`
    DELETE FROM texts WHERE id = ${id};
    `)
  },
}
