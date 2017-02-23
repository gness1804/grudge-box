const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
// const http = require('http');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Grudge Box'

app.locals.enemies = [
  {
    id: 372921,
    name: 'The Grinch',
    offense: 'Stealing Christmas',
    date: '12/25/2016',
    forgiven: false,
  },
]

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api/vi/enemies', (request, response) => {
  response.send(app.locals.enemies);
});

app.listen(app.get('port'), () => {
  console.log('The server is listening on port 3000.'); // eslint-disable-line
});
//
// app.post('/api/vi/enemies', (request, response) => {
//   const enemyInfo = request.body
//   app.locals.enemies.push(enemyInfo)
// });
