const {Router} = require('express');

const DictionaryEntry = require('../../persistence/dictionary_entries');

const router = new Router();

router.get('/:query', (req, res) => {
  const { query } = req.params;
  DictionaryEntry.search(query)
  .then(result => {
    res.json({
      suggestions: result
    });
  });
});

router.post('/', (req, res) => {
  const { reference_number } = req.body;
  if (!referenceNumber) {
    res.status(422);
    res.render('error', { error: 'missing reference_number' });
  };
  res.status(200);
  res.json({
    message: 'success'
  });
});

module.exports = router;
