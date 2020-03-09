const db = require('../persistence/db')

module.exports.up = async function(next) {
  const client = await db.connect()

  await client.query(`
  CREATE TABLE IF NOT EXISTS organizations (
    id uuid PRIMARY KEY,
    name text UNIQUE,
    description text
  );

  CREATE TABLE organizations_users (
    organization_id uuid NOT NULL,
    user_id uuid NOT NULL,
    admin boolean NOT NULL,
    PRIMARY KEY (organization_id, user_id),
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
  );
  `)

  await client.release(true)
  next()
}

module.exports.down = async function(next) {
  const client = await db.connect()

  await client.query(`
  DROP TABLE if exists organizations cascade;

  DROP TABLE if exists organizations_users cascade;
  `)

  await client.release(true)
  next()
}
