const {Router} = require('express');

const VocabularyListUser = require('../../persistence/vocabulary_lists_users');
const VocabularyListDictionaryEntry = require('../../persistence/vocabulary_lists_dictionary_entries');

const router = new Router();

router.get('/by_user', (req, res) => {
  if (!req.session.userID) {
    return res.status(403).json({});
  }
  VocabularyListUser.find(req.session.userID)
  .then(result => {
    res.json({
      lists: result
    });
  });
});

router.get('/by_user/:vocabulary_list_id', (req, res) => {
  if (!req.session.userID) {
    return res.status(403).json({});
  }
  const { vocabulary_list_id } = req.params;
  VocabularyListDictionaryEntry.find(vocabulary_list_id, req.session.userID)
  .then(result => {
    res.json({
      entries: result
    });
  });
});

module.exports = router;
