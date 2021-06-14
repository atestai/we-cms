
const express = require('express');
const path = require('path');

const authorize = require('../Helpers/authorize')

const app = express();

app.use(express.static(path.join(__dirname, 'build')));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.use(express.json());

app.use('/api/auth', require('./Server/Controllers/auth') );
app.use('/api/users', authorize, require('./Server/Controllers/users') );

/*
app.get('/api/users', (req, res) =>{

    res.json({
        users: [
            {name : 'Antonio'},
            {name : 'Andrea'},
        ]        
    });
} );
*/

app.listen(process.env.PORT || 8080);