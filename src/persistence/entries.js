const sql = require('sql-template-strings')
const uuid = require('uuid/v4')
const db = require('./db')

module.exports = {
  async create(reference_number, lemma, body, orthographicDetails) {
    if (!reference_number || !lemma || !body || !orthographicDetails) {
      return null
    }
    const id = uuid()
    await db.query(sql`
    INSERT INTO entries (id, reference_number, lemma, body, orthography)
      VALUES (${id}, ${reference_number}, ${lemma}, ${body}, ${orthographicDetails});
    `)
    return id
  },
  async find(id) {
    const { rows } = await db.query(sql`
    SELECT lemma, body FROM entries WHERE id = ${id} LIMIT 1;
    `)

    return rows.map(entry => ({
      referenceNumber: entry.reference_number,
      lemma: entry.lemma,
      body: entry.body,
    }))
  },
  search(query) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT id, reference_number, lemma, body, orthography FROM entries WHERE lemma ILIKE $1 ORDER BY lemma ASC LIMIT 10',
        [query + '%'],
        (err, result) => {
          resolve(result.rows)
        }
      )
    })
  },
  async save() {},
  async delete(id) {
    await db.query(sql`
    DELETE FROM entries WHERE id = ${id};
    `)
  },
}
