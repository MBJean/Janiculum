const express = require('express');

const morgan = require('morgan');
const clientSession = require('client-sessions');
const helmet = require('helmet');

const {SESSION_SECRET} = require('./config');

const app = express();
const api = require('./src/api');

app.get('/', (req, res) => res.sendStatus(200));
app.get('/health', (req, res) => res.sendStatus(200));

app.use(morgan('short'));
app.use(express.json());
app.use(
  clientSession({
    cookieName: 'theLatinToolkitSession',
    secret: SESSION_SECRET,
    duration: 24 * 60 * 60 * 1000
  })
);
// app.use((req, res, next) => {
//   if (req.theLatinToolkitSession.seenyou) {
//     res.setHeader('X-Seen-You', 'true');
//   } else {
//     // setting a property will automatically cause a Set-Cookie response to be sent
//     req.theLatinToolkitSession.seenyou = true;
//     res.setHeader('X-Seen-You', 'false');
//   }
// });
app.use(helmet());

app.use(api);

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
