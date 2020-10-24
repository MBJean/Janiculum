const db = require('../persistence/db')

module.exports.up = async function(next) {
  const client = await db.connect()

  await client.query(`
  CREATE TABLE IF NOT EXISTS text_queries (
    id uuid PRIMARY KEY,
    text_id uuid NOT NULL,
    body text UNIQUE NOT NULL,
    response text NOT NULL,
    FOREIGN KEY (text_id) REFERENCES texts(id) ON UPDATE CASCADE
  );
  `)

  await client.query(`
  CREATE INDEX body_text_queries on text_queries (text_id, body);
  `)

  await client.release(true)
  next()
}

module.exports.down = async function(next) {
  const client = await db.connect()

  await client.query(`
    DROP TABLE if exists text_queries;
    DROP TABLE if exists body_text_queries cascade;
  `)

  await client.release(true)
  next()
}
