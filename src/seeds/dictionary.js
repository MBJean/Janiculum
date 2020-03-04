const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmlserializer');
const DictionaryEntry = require('../persistence/dictionary_entries');
const DictionaryDefinition = require('../persistence/dictionary_definitions');

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
        const dictionary_entry_id = DictionaryEntry.create(
          entry.getAttribute('id'),
          entry.getAttribute('key'),
          XMLSerializer.serializeToString(entry)
        );
        if (!dictionary_entry_id) {
          process.stdout.write("x");
          return
        };
        process.stdout.write(".");
        const definitions = entry.getElementsByTagName("sense");
        for (let j = 0; j < definitions.length; j++) {
          const definition = definitions[j];
          const dictionary_definition_id = DictionaryDefinition.create(
            definition.getAttribute('id'),
            definition.getAttribute('level'),
            XMLSerializer.serializeToString(definition)
          );
          if (!dictionary_definition_id) {
            process.stdout.write("x");
            return
          };
          process.stdout.write("_");
        }
      }
      console.log('\ndictionary seed complete');
    });
  },
};
