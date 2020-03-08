const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmlserializer');
const Entry = require('../persistence/entries');
const Definition = require('../persistence/definitions');

module.exports = {
  init() {
    fs.readFile(__dirname + '/../lib/lat-dict-a.xml', 'utf8', function(err, xml) {
      if (err) {
        console.log(err);
        return;
      }
      const doc = new DOMParser().parseFromString(xml);
      const entries = doc.getElementsByTagName("entryFree");
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        Entry.create(
          entry.getAttribute('id'),
          entry.getAttribute('key'),
          XMLSerializer.serializeToString(entry)
        )
          .then(entry_id => {
            process.stdout.write(".");
            const definitions = entry.getElementsByTagName("sense");
            for (let j = 0; j < definitions.length; j++) {
              const definition = definitions[j];
              const definition_id = Definition.create(
                entry_id,
                definition.getAttribute('id'),
                definition.getAttribute('level'),
                XMLSerializer.serializeToString(definition)
              )
                .then(definition_id => {
                  process.stdout.write("_");
                })
                .catch(error => {
                  console.log(error);
                });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  },
};
