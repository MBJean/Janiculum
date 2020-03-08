const db = require('../persistence/db');

module.exports.up = async function(next) {
  const client = await db.connect();

  await client.query(`
  ALTER TABLE definitions
  RENAME COLUMN dictionary_entry_id TO entry_id;

  ALTER TABLE vocabularies_definitions
  RENAME COLUMN vocabulary_list_id TO vocabulary_id;

  ALTER TABLE vocabularies_definitions
  RENAME COLUMN dictionary_definition_id TO definition_id;

  ALTER TABLE vocabularies_entries
  RENAME COLUMN vocabulary_list_id TO vocabulary_id;

  ALTER TABLE vocabularies_entries
  RENAME COLUMN dictionary_entry_id TO entry_id;

  ALTER TABLE vocabularies_organizations
  RENAME COLUMN vocabulary_list_id TO vocabulary_id;

  ALTER TABLE vocabularies_users
  RENAME COLUMN vocabulary_list_id TO vocabulary_id;
  `);
  await client.release(true);
  next();
};

module.exports.down = async function(next) {
  const client = await db.connect();

  await client.query(`
    ALTER TABLE definitions
    RENAME COLUMN entry_id TO dictionary_entry_id;

    ALTER TABLE vocabularies_definitions
    RENAME COLUMN vocabulary_id TO vocabulary_list_id;

    ALTER TABLE vocabularies_definitions
    RENAME COLUMN definition_id TO dictionary_definition_id;

    ALTER TABLE vocabularies_entries
    RENAME COLUMN vocabulary_id TO vocabulary_list_id;

    ALTER TABLE vocabularies_entries
    RENAME COLUMN entry_id TO dictionary_entry_id;

    ALTER TABLE vocabularies_organizations
    RENAME COLUMN vocabulary_id TO vocabulary_list_id;

    ALTER TABLE vocabularies_users
    RENAME COLUMN vocabulary_id TO vocabulary_list_id;
  `);

  await client.release(true);
  next();
};
