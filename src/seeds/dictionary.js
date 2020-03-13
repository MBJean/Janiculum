const DOMParser = require('xmldom').DOMParser
const XMLSerializer = require('xmlserializer')
const Entry = require('../persistence/entries')
const Definition = require('../persistence/definitions')

module.exports = {
  init(file) {
    fs.readFile(
      __dirname + `/../lib/latin-dictionary/${file}`,
      'utf8',
      function(err, xml) {
        if (err) {
          console.log(err)
          return
        }
        const doc = new DOMParser().parseFromString(xml)
        const entries = doc.getElementsByTagName('entryFree')
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i]
          Entry.create(
            entry.getAttribute('id'),
            entry.getAttribute('key'),
            XMLSerializer.serializeToString(entry)
          )
            .then(entry_id => {
              process.stdout.write('.')
              const definitions = entry.getElementsByTagName('sense')
              for (let j = 0; j < definitions.length; j++) {
                const definition = definitions[j]
                const definition_id = Definition.create(
                  entry_id,
                  definition.getAttribute('id'),
                  definition.getAttribute('level'),
                  XMLSerializer.serializeToString(definition)
                )
                  .then(definition_id => {
                    process.stdout.write('_')
                  })
                  .catch(error => {
                    console.log(error)
                  })
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    )
  },
  addOrthographicDetails(file) {
    fs.readFile(
      __dirname + `/../lib/latin-dictionary/${file}`,
      'utf8',
      function(err, xml) {
        if (err) {
          console.log(err)
          return
        }
        const doc = new DOMParser().parseFromString(xml)
        const entries = doc.getElementsByTagName('entryFree')
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i]

          let orthFull = Array.prototype.filter.call(
              entry.getElementsByTagName('orth'),
              (el) => el.getAttribute('extent') == 'full'
          )[0];
          orthFull = orthFull && orthFull.childNodes && orthFull.childNodes.length
            ? orthFull.childNodes[0].nodeValue
            : null

          let orthAlt = Array.prototype.filter.call(
              entry.getElementsByTagName('orth'),
              (el) => el.getAttribute('type') == 'alt'
          )[0];
          orthAlt = orthAlt && orthAlt.childNodes && orthAlt.childNodes.length
            ? orthAlt.childNodes[0].nodeValue
            : null

          let itype = entry.getElementsByTagName('itype')[0]
          itype = itype && itype.childNodes && itype.childNodes.length
            ? itype.childNodes[0].nodeValue
            : null

          let pos = entry.getElementsByTagName('pos')[0]
          pos = pos && pos.childNodes && pos.childNodes.length
            ? pos.childNodes[0].nodeValue
            : null

          let etym = entry.getElementsByTagName('etym')[0]
          etym = etym && etym.childNodes && etym.childNodes.length
            ? etym.childNodes[0].nodeValue
            : null

          const orthgraphicDetails = [
            orthFull,
            orthAlt,
            itype,
            pos,
            etym
          ]
          .filter(detail => !!detail)
          .join(' ')
          Entry.updateOrthography(
            entry.getAttribute('id'),
            orthgraphicDetails
          )
            .then(entry_id => {
              process.stdout.write('.')
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    )
  }
}
