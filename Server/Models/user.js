const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
    
    name : "string",
	role : "string",
	password : "string",
	username : "string",
	create_delete :{ type: Date, default: null },
	create_at :{ type: Date, default: Date.now },
	create_update :{ type: Date, default: Date.now },

});	


const User = mongoose.model('User', schema);


module.exports = User;