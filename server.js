const express = require('express');
const graphqlHTTP = require('express-graphql')
const graphqlSchema = require('./src/graphql/schema.js')
const cors = require('cors')

const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.get('/health', (req, res) => res.sendStatus(200));

app.use(morgan('short'));
app.use(express.json());
app.use(helmet());

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    credentials: true,
  }))
}

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  graphiql: true
}))

app.use(express.static('public'))

app.get('/', function (req, res){
  res.send('Welcome to local development!');
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
