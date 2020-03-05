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

router.post('/', (req, res) => {
  const referenceNumber = req.body.reference_number;
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
