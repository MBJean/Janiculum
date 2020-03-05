const db = require('../persistence/db');

module.exports.up = async function(next) {
  const client = await db.connect();

  await client.query(`
  ALTER TABLE dictionary_definitions
  ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

  ALTER TABLE dictionary_entries
  ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

  ALTER TABLE organizations_users
  ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

  ALTER TABLE organizations
  ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

  ALTER TABLE sessions
  ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

  ALTER TABLE users
  ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

  ALTER TABLE vocabulary_lists_dictionary_definitions
  ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

  ALTER TABLE vocabulary_lists_dictionary_entries
  ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

  ALTER TABLE vocabulary_lists_organizations
  ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

  ALTER TABLE vocabulary_lists_users
  ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

  ALTER TABLE vocabulary_lists
  ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
  `);
  await client.release(true);
  next();
};

module.exports.down = async function(next) {
  const client = await db.connect();

  await client.query(`
  ALTER TABLE dictionary_definitions
  DROP COLUMN created_at;

  ALTER TABLE dictionary_entries
  DROP COLUMN created_at;

  ALTER TABLE organizations_users
  DROP COLUMN created_at;

  ALTER TABLE organizations
  DROP COLUMN created_at;

  ALTER TABLE sessions
  DROP COLUMN created_at;

  ALTER TABLE users
  DROP COLUMN created_at;

  ALTER TABLE vocabulary_lists_dictionary_definitions
  DROP COLUMN created_at;

  ALTER TABLE vocabulary_lists_dictionary_entries
  DROP COLUMN created_at;

  ALTER TABLE vocabulary_lists_organizations
  DROP COLUMN created_at;

  ALTER TABLE vocabulary_lists_users
  DROP COLUMN created_at;

  ALTER TABLE vocabulary_lists
  DROP COLUMN created_at;
  `);

  await client.release(true);
  next();
};
