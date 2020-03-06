const express = require('express');

const {Router} = express;
const router = new Router();

const user = require('./v1/user');
const session = require('./v1/session');
const dictionary_entry = require('./v1/dictionary_entry');
const vocabulary = require('./v1/vocabulary');

router.use('/api/v1/users', user);
router.use('/api/v1/sessions', session);
router.use('/api/v1/dictionary_entry', dictionary_entry);
router.use('/api/v1/vocabulary', vocabulary);

module.exports = router;
