
const express = require('express');
const path = require('path');
const cors = require('cors');

const authorize = require('./Server/helpers/authorize')


const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.use(express.json());


app.use('/api/auth', require('./Server/controllers/auth') );
app.use('/api/users', authorize, require('./Server/controllers/users') );
app.use('/api/patients', authorize, require('./Server/controllers/patients') );
app.use('/api/analysis', require('./Server/controllers/analysis') );

app.use((req, res) => res.status(404).send());

app.listen(process.env.PORT || 8080);