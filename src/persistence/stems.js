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
  async search(query) {
    const { rows } = await db.query(sql`
      SELECT
        stems.body
      FROM
        stems
      INNER JOIN
        senses
      ON
        senses.stem_id = stems.id
      WHERE
        to_tsvector(senses.body) @@ to_tsquery(${query})
      LIMIT
        200;
    `)
    return rows
  },
}
