const express = require('express');
const graphqlHTTP = require('express-graphql')
const graphqlSchema = require('./src/graphql/schema.js')
const cors = require('cors')

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

if (process.env.NODE_ENV !== 'production') {
  app.use(cors())
}

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  graphiql: true
}))

app.use(express.static('public'))

app.get('/', function (req, res){
  if (req.session.userID) {
    res.send('Welcome ' + req.session.userEmail + '! (<a href="/logout">logout</a>)');
  }
  res.send('You need to login.');
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
