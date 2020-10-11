const DOMParser = require('xmldom').DOMParser
const XMLSerializer = require('xmlserializer')
const Author = require('../persistence/authors')
const Text = require('../persistence/texts')

module.exports = {
  ovid: {
    async amores() {
      try {
        const author_id = await Author.find_or_create('ovid', 'Publius Ovidius Naso')
        fs.readFile(
          __dirname + `/../lib/latin-texts/ovid/amores.xml`,
          'utf8',
          async function(err, xml) {
            if (err) {
              console.log(err)
              return
            }
            try {
              await Text.find_or_create(author_id, 'amores', 'Amores', xml)
              process.stdout.write('.')
            } catch(error) {
              console.log(error)
            }
          }
        )
      } catch(error) {
        console.log(error)
      }
    },
  },
}
