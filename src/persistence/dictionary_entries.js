const sql = require('sql-template-strings');
const uuid = require('uuid/v4');
const db = require('./db');

module.exports = {
  async create(reference_number, lemma, body) {
    if (!reference_number || !lemma || !body) {
      return null;
    }
    const id = uuid();
    await db.query(sql`
    INSERT INTO dictionary_entries (id, reference_number, lemma, body)
      VALUES (${id}, ${reference_number}, ${lemma}, ${body});
    `);
    return id;
  },
  async find(id) {
    const {rows} = await db.query(sql`
    SELECT lemma, body FROM dictionary_entries WHERE id = ${id} LIMIT 1;
    `);

    return rows.map(entry => ({
      referenceNumber: entry.reference_number,
      lemma: entry.lemma,
      body: entry.body
    }));
  },
  search(query) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT lemma, body FROM dictionary_entries WHERE lemma LIKE $1 LIMIT 5",
        [query + '%'],
        (err, result) => {
          resolve(result.rows);
        }
      );
    });
  },
  async delete(id) {
    await db.query(sql`
    DELETE FROM dictionary_entries WHERE id = ${id};
    `);
  }
};
