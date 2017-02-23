const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

app.locals.title = ''

app.get('/', (request, response) => {
  response.send('I am serving data.');
});

app.listen(app.get('port'), () => {
    console.log('The server is listening on port 3000.');
});
