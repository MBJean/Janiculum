const sql = require('sql-template-strings')
const uuid = require('uuid/v4')
const db = require('./db')

module.exports = {
  async create(reference_number, lemma, body) {
    if (!reference_number || !lemma || !body) {
      return null
    }
    const id = uuid()
    await db.query(sql`
    INSERT INTO entries (id, reference_number, lemma, body)
      VALUES (${id}, ${reference_number}, ${lemma}, ${body});
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
  async updateOrthography(referenceNumber, orthographicDetails) {
    const { rows } = await db.query(sql`
      UPDATE entries
      SET orthography = ${orthographicDetails}
      WHERE reference_number = ${referenceNumber};
    `)
    return rows
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
