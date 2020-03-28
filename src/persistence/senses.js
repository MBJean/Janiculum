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
    return rows.map(entry => entry.body)
  },
}
