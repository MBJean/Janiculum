const sql = require('sql-template-strings')
const uuid = require('uuid/v4')
const db = require('./db')
const Author = require('./authors')
const TextQuery = require('./text_queries')

module.exports = {
  async find_or_create(author_id, title, display_title, body) {
    if (!author_id || !title || !display_title || !body) return null
    const author = await Author.find(author_id)
    if (!author) return null
    const existingText = await this.search(author.name, title)
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
  async search(author_name, title) {
    const { id } = await Author.search(author_name)
    if (!id) return null
    const { rows } = await db.query(sql`
    SELECT * FROM texts WHERE author_id = ${id} AND title = ${title};
    `)
    return rows[0]
  },
  async query(id, xpathQuery) {
    const existingQuery = await TextQuery.search(id, xpathQuery)
    if (existingQuery) {
      return existingQuery.response
    }
    const { rows } = await db.query(
      'SELECT xpath($1, body)::varchar[] FROM public.texts WHERE id = $2',
      [xpathQuery, id]
    )
    const stringifiedXml = rows[0].xpath[0]
    if (stringifiedXml) {
      await TextQuery.create(id, xpathQuery, stringifiedXml)
      return stringifiedXml
    }
    return null
  },
  async delete(id) {
    await db.query(sql`
    DELETE FROM texts WHERE id = ${id};
    `)
  },
}
