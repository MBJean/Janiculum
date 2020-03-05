const db = require('../persistence/db');

module.exports.up = async function(next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS vocabulary_lists (
    id uuid PRIMARY KEY,
    name text,
    description text
  );

  CREATE TABLE vocabulary_lists_users (
    vocabulary_list_id uuid NOT NULL,
    user_id uuid NOT NULL,
    admin boolean NOT NULL,
    PRIMARY KEY (vocabulary_list_id, user_id),
    FOREIGN KEY (vocabulary_list_id) REFERENCES vocabulary_lists(id) ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
  );

  CREATE TABLE vocabulary_lists_organizations (
    vocabulary_list_id uuid NOT NULL,
    organization_id uuid NOT NULL,
    PRIMARY KEY (vocabulary_list_id, organization_id),
    FOREIGN KEY (vocabulary_list_id) REFERENCES vocabulary_lists(id) ON UPDATE CASCADE,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON UPDATE CASCADE
  );

  CREATE TABLE vocabulary_lists_dictionary_entries (
    vocabulary_list_id uuid NOT NULL,
    dictionary_entry_id uuid NOT NULL,
    PRIMARY KEY (vocabulary_list_id, dictionary_entry_id),
    FOREIGN KEY (vocabulary_list_id) REFERENCES vocabulary_lists(id) ON UPDATE CASCADE,
    FOREIGN KEY (dictionary_entry_id) REFERENCES dictionary_entries(id) ON UPDATE CASCADE
  );

  CREATE TABLE vocabulary_lists_dictionary_definitions (
    vocabulary_list_id uuid NOT NULL,
    dictionary_definition_id uuid NOT NULL,
    PRIMARY KEY (vocabulary_list_id, dictionary_definition_id),
    FOREIGN KEY (vocabulary_list_id) REFERENCES vocabulary_lists(id) ON UPDATE CASCADE,
    FOREIGN KEY (dictionary_definition_id) REFERENCES dictionary_definitions(id) ON UPDATE CASCADE
  );
  `);

  await client.release(true);
  next();
};

module.exports.down = async function(next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE if exists vocabulary_lists cascade;

  DROP TABLE if exists vocabulary_lists_users cascade;

  DROP TABLE if exists vocabulary_lists_organizations cascade;

  DROP TABLE if exists vocabulary_lists_dictionary_entries cascade;

  DROP TABLE if exists vocabulary_lists_dictionary_definitions cascade;
  `);

  await client.release(true);
  next();
};
