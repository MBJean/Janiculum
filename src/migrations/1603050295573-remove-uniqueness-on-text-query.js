const db = require('../persistence/db')

module.exports.up = async function(next) {
  const client = await db.connect()

  await client.query(`
  ALTER TABLE text_queries
  DROP CONSTRAINT text_queries_body_key;
  `)
  await client.release(true)
  next()
}

module.exports.down = async function(next) {
  const client = await db.connect()

  await client.query(`
  ALTER TABLE text_queries
  ADD UNIQUE (body);
  `)

  await client.release(true)
  next()
}
