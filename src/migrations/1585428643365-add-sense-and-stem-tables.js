const db = require('../persistence/db')

module.exports.up = async function(next) {
  const client = await db.connect()

  await client.query(`
  CREATE TABLE IF NOT EXISTS stems (
    id uuid PRIMARY KEY,
    body text
  );

  CREATE TABLE IF NOT EXISTS senses (
    id uuid PRIMARY KEY,
    stem_id uuid REFERENCES stems (id) ON DELETE CASCADE,
    body text
  );
  `)

  await client.release(true)
  next()
}

module.exports.down = async function(next) {
  const client = await db.connect()

  await client.query(`
  DROP TABLE if exists senses cascade;

  DROP TABLE if exists stems cascade;
  `)

  await client.release(true)
  next()
}
