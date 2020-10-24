const DOMParser = require('xmldom').DOMParser
const XMLSerializer = require('xmlserializer')
const Author = require('../persistence/authors')
const Text = require('../persistence/texts')

const AUTHORS = {
  cicero: { name: 'cicero', fullName: 'Marcus Tullius Cicero' },
  ovid: { name: 'ovid', fullName: 'Publius Ovidius Naso' },
  vergil: { name: 'vergil', fullName: 'Publius Vergilius Maro' },
}

const METADATA = [
  {
    author: { name: AUTHORS.ovid.name, fullName: AUTHORS.ovid.fullName },
    text: { title: 'amores', fullTitle: 'Amores' }
  },
  {
    author: { name: AUTHORS.ovid.name, fullName: AUTHORS.ovid.fullName },
    text: { title: 'metamorphoses', fullTitle: 'Metamorphoses' }
  },
  {
    author: { name: AUTHORS.vergil.name, fullName: AUTHORS.vergil.fullName },
    text: { title: 'aeneid', fullTitle: 'Aeneid' }
  },
  {
    author: { name: AUTHORS.cicero.name, fullName: AUTHORS.cicero.fullName },
    text: { title: 'in-catilinam', fullTitle: 'In Catilinam' }
  },
]

module.exports = {
  async init() {
    METADATA.forEach(async data => {
      try {
        const authorId = await Author.find_or_create(data.author.name, data.author.fullName)
        const fileName =   __dirname + `/../lib/latin-texts/${data.author.name}/${data.text.title}.xml`
        const callback = async function(err, xml) {
          if (err) throw new Error(err)
          try {
            await Text.find_or_create(authorId, data.text.title, data.text.fullTitle, xml)
            process.stdout.write('.')
          } catch(error) {
            throw new Error(error)
          }
        }
        fs.readFile(fileName, 'utf8', callback)
      } catch(error) {
        console.log(error)
      }
    })
  },
}
