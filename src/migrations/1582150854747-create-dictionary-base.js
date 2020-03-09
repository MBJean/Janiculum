const db = require('../persistence/db')

module.exports.up = async function(next) {
  const client = await db.connect()

  await client.query(`
  CREATE TABLE IF NOT EXISTS dictionary_entries (
    id uuid PRIMARY KEY,
    reference_number text UNIQUE,
    lemma text,
    body text
  );

  CREATE TABLE IF NOT EXISTS dictionary_definitions (
    id uuid PRIMARY KEY,
    dictionary_entry_id uuid REFERENCES dictionary_entries (id) ON DELETE CASCADE,
    reference_number text UNIQUE,
    level integer,
    body text
  );
  `)

  await client.query(`
  CREATE INDEX dictionary_entries_lemma on dictionary_entries (lemma);

  CREATE INDEX dictionary_entries_reference_number on dictionary_entries (reference_number);

  CREATE INDEX dictionary_definitions_entry on dictionary_definitions (dictionary_entry_id);

  CREATE INDEX dictionary_definitions_reference_number on dictionary_definitions (reference_number);
  `)

  await client.release(true)
  next()
}

module.exports.down = async function(next) {
  const client = await db.connect()

  await client.query(`
  DROP TABLE if exists dictionary_entries cascade;
  DROP TABLE if exists dictionary_definitions;
  `)

  await client.release(true)
  next()
}
