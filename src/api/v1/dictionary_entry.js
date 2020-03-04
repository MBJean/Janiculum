const {Router} = require('express');

const DictionaryEntry = require('../../persistence/dictionary_entries');

const router = new Router();

router.get('/:query', (req, res) => {
  const query = req.params.query;
  DictionaryEntry.search(query)
    .then(result => {
      res.json({
        suggestions: result
      });
    });
});

module.exports = router;
