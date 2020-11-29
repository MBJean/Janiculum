const db = require('../persistence/db')

module.exports.up = async function(next) {
  const client = await db.connect()

  await client.query(`
  CREATE TABLE IF NOT EXISTS notes (
    id uuid PRIMARY KEY,
    title text,
    body text
  );
  `)

  await client.release(true)
  next()
}

module.exports.down = async function(next) {
  const client = await db.connect()

  await client.query(`
  DROP TABLE if exists notes;
  `)

  await client.release(true)
  next()
}
