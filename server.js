const express = require('express');

const morgan = require('morgan');
const clientSession = require('client-sessions');
const helmet = require('helmet');

const {SESSION_SECRET} = require('./config');

const app = express();
const api = require('./src/api');

app.get('/health', (req, res) => res.sendStatus(200));

app.use(morgan('short'));
app.use(express.json());
app.use(
  clientSession({
    cookieName: 'session',
    secret: SESSION_SECRET,
    duration: 24 * 60 * 60 * 1000
  })
);
app.use(helmet());

app.use(api);

app.get('/', function (req, res){
  if (req.session.userID) {
    res.send('Welcome ' + req.session.userEmail + '! (<a href="/logout">logout</a>)');
  }
  res.send('You need to login.');
});




app.get('/test/1/login', function (req, res){
  req.session.userID = 'c6eb2f92-11d1-4f46-abdf-ad877ed5ce1f';
  req.session.userEmail = 'test1@test.com';
  res.redirect('/');
});

app.get('/test/2/login', function (req, res){
  req.session.userID = '0a52a286-446f-4efc-b7bb-959f378a955d';
  req.session.userEmail = 'test2@test.com';
  res.redirect('/');
});

app.get('/test/1/init', function (req, res) {
  if (!req.session.userID) {
    res.redirect('/');
  }
  const VocabularyList = require('./src/persistence/vocabulary_lists');
  const VocabularyListDictionaryEntry = require('./src/persistence/vocabulary_lists_dictionary_entries');
  const id = VocabularyList.create('test vocabulary list', 'test description', req.session.userID)
  .then(result => {
    VocabularyListDictionaryEntry.create(result, '35b33d2e-c9f5-411e-8968-b1790d963d67');
    VocabularyListDictionaryEntry.create(result, '5f5baa2a-713d-4970-81d4-c7a68a0cf787');
    VocabularyListDictionaryEntry.create(result, '4a897e64-d472-4a65-be53-998ba401daa2');
  });
  res.send('test 1 init');
});

app.get('/logout', function (req, res) {
  req.session.reset();
  res.redirect('/');
});




let server;
module.exports = {
  start(port) {
    server = app.listen(port, () => {
      console.log(`App started on port ${port}`);
    });
    return app;
  },
  stop() {
    server.close();
  }
};
