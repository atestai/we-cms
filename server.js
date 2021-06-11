
const express = require('express');

const bodyParser = require('body-parser')

const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));


app.get('/api/users', (req, res) =>{

    res.json({
        users: [
            {name : 'Antonio'},
            {name : 'Andrea'},
        ]
        
    });

} );

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);