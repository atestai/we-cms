const mongoose = require('mongoose');
const {uri}  = require('../Config/database.json');


module.exports = () => {
    return mongoose.connect(uri, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
}