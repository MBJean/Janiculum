const DOMParser = require('xmldom').DOMParser
const XMLSerializer = require('xmlserializer')
const Sense = require('../persistence/senses')
const Stem = require('../persistence/stems')
const Pairings = require('../lib/english-to-latin/english-latin-pairings.json')

module.exports = {
  async init() {
    Pairings.forEach(pair => {
      Stem.create(pair["stem"])
        .then(stem_id => {
          process.stdout.write('.')
          pair["senses"].forEach(sense => {
            Sense.create(sense, stem_id)
              .then(() => {
                process.stdout.write('_')
              })
              .catch(error => {
                console.log(error)
              })
          })
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
}
