const db = require('../persistence/db')

module.exports.up = async function(next) {
  const client = await db.connect()

  await client.query(`
  ALTER TABLE notes
  ADD COLUMN user_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE;
  `)
  await client.release(true)
  next()
}

module.exports.down = async function(next) {
  const client = await db.connect()

  await client.query(`
  ALTER TABLE notes
  DROP COLUMN user_id;
  `)

  await client.release(true)
  next()
}
