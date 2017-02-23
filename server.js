const express = require('express');
const moment = require('moment')

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
    rawDateOfOffense: new Date('12/25/2016').getTime(),
    forgiven: false,
  },
]

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api/vi/enemies', (request, response) => {
  response.send(app.locals.enemies);
});

app.get('/api/vi/enemies/:id', (request, response) => {
  const { id } = request.params;
  const target = app.locals.enemies.filter((enemy) => {
    return enemy.id === parseInt(id, 10)
  })
  response.send(target);
});

app.patch('/api/vi/enemies/:id', (request, response) => {
  const { forgiven } = request.body
  const { id } = request.params;
  const target = app.locals.enemies.filter((enemy) => {
    return enemy.id === parseInt(id, 10)
  })
  Object.assign(target[0], { forgiven })
  app.locals.enemies = app.locals.enemies.filter((enemy) => {
    return enemy.id !== parseInt(id, 10)
  })
  app.locals.enemies.push(target[0])
});

app.listen(app.get('port'), () => {
  console.log('The server is listening on port 3000.'); // eslint-disable-line
});

app.post('/api/vi/enemies', (request) => {
  const enemyInfo = Object.assign(request.body,
    {
      rawDateOfOffense: new Date(request.body.date).getTime(),
    })
  app.locals.enemies.push(enemyInfo)
});
