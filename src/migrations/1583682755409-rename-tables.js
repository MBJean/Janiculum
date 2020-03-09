const db = require('../persistence/db')

module.exports.up = async function(next) {
  const client = await db.connect()

  await client.query(`
  ALTER TABLE dictionary_definitions
  RENAME TO definitions;

  ALTER TABLE dictionary_entries
  RENAME TO entries;

  ALTER TABLE vocabulary_lists
  RENAME TO vocabularies;

  ALTER TABLE vocabulary_lists_dictionary_definitions
  RENAME TO vocabularies_definitions;

  ALTER TABLE vocabulary_lists_dictionary_entries
  RENAME TO vocabularies_entries;

  ALTER TABLE vocabulary_lists_organizations
  RENAME TO vocabularies_organizations;

  ALTER TABLE vocabulary_lists_users
  RENAME TO vocabularies_users;
  `)
  await client.release(true)
  next()
}

module.exports.down = async function(next) {
  const client = await db.connect()

  await client.query(`
    ALTER TABLE definitions
    RENAME TO dictionary_definitions;

    ALTER TABLE entries
    RENAME TO dictionary_entries;

    ALTER TABLE vocabularies
    RENAME TO vocabulary_lists;

    ALTER TABLE vocabularies_definitions
    RENAME TO vocabulary_lists_dictionary_definitions;

    ALTER TABLE vocabularies_entries
    RENAME TO vocabulary_lists_dictionary_entries;

    ALTER TABLE vocabularies_organizations
    RENAME TO vocabulary_lists_organizations;

    ALTER TABLE vocabularies_users
    RENAME TO vocabulary_lists_users;
  `)

  await client.release(true)
  next()
}
