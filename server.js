const express = require('express');
const graphqlHTTP = require('express-graphql')
const graphqlSchema = require('./src/graphql/schema.js')

const morgan = require('morgan');
const clientSession = require('client-sessions');
const helmet = require('helmet');

const { SESSION_SECRET } = require('./config');

const app = express();

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

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  graphiql: true
}))

app.get('/', function (req, res){
  if (req.session.userID) {
    res.send('Welcome ' + req.session.userEmail + '! (<a href="/logout">logout</a>)');
  }
  res.send('You need to login.');
});




app.get('/login/:email', function (req, res){
  const User = require('./src/persistence/users');
  const newUserEmail = req.params.email;
  console.log(newUserEmail);
  const newUserPassword = 'testpassword';
  User.find(newUserEmail).then(user => {
    if (user) {
      req.session.userID = user.id;
      req.session.userEmail = user.email;
      res.redirect('/');
    } else {
      User.create(newUserEmail, newUserPassword).then(user => {
        req.session.userID = user.id;
        req.session.userEmail = user.email;
        res.redirect('/');
      });
    }
  });
});

app.get('/create-vocabulary-list', function (req, res) {
  if (!req.session.userID) {
    res.redirect('/');
  }
  const VocabularyList = require('./src/persistence/vocabulary_lists');
  const DictionaryEntry = require('./src/persistence/dictionary_entries');
  const VocabularyListDictionaryEntry = require('./src/persistence/vocabulary_lists_dictionary_entries');
  VocabularyList
    .create('Test Vocabulary List', 'This list is for the first test user.', req.session.userID)
    .then(vocabularyListID => {
      Promise.all([
        DictionaryEntry.search('acervus'),
        DictionaryEntry.search('aegyptus'),
        DictionaryEntry.search('annus')
      ])
      .then(entryLists => {
        const vocabularyListDicationaryEntries = entryLists.map(entryList => {
          VocabularyListDictionaryEntry.create(vocabularyListID, entryList[0].id);
        })
        Promise.all(vocabularyListDicationaryEntries).then(result => {
          res.send(`New vocabulary list created with id: ${vocabularyListID}`);
        });
      }
    );
  });
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
