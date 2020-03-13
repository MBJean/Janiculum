const db = require('../persistence/db')

module.exports.up = async function(next) {
  const client = await db.connect()

  await client.query(`
  ALTER TABLE entries
  ADD COLUMN orthography text;
  `)
  await client.release(true)
  next()
}

module.exports.down = async function(next) {
  const client = await db.connect()

  await client.query(`
  ALTER TABLE entries
  DROP COLUMN orthography;
  `)

  await client.release(true)
  next()
}
