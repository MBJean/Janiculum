const db = require('../persistence/db')

module.exports.up = async function(next) {
  const client = await db.connect()

  await client.query(`
  CREATE TABLE IF NOT EXISTS authors (
    id uuid PRIMARY KEY,
    name text UNIQUE NOT NULL,
    display_name text NOT NULL
  );

  CREATE TABLE texts (
    id uuid PRIMARY KEY,
    author_id uuid NOT NULL,
    title text NOT NULL,
    display_title text NOT NULL,
    body xml NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON UPDATE CASCADE
  );
  `)

  await client.release(true)
  next()
}

module.exports.down = async function(next) {
  const client = await db.connect()

  await client.query(`
  DROP TABLE if exists authors cascade;

  DROP TABLE if exists texts cascade;
  `)

  await client.release(true)
  next()
}
