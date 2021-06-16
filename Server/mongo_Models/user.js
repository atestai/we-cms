const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
    
    name : {
		type: String,
		required: true
	},
	
	role: {
		type: String,
		enum: {
			values: ['admin', 'doctor', 'patient'],
			message: '{VALUE} is not supported'
		},
		required: true,
		default: 'patient'
	},

	email : {
		type: String,
		//required: true,
		
	},

	username : {
		type: String,
		required: true
	},

	password : {
		type: String,
		required: true,
		// set: Data.prototype.saltySha1 // some function called before saving the data
	},
	
	delete_at :{ type: Date, default: null },
	create_at :{ type: Date, default: Date.now },
	update_at :{ type: Date, default: null },

},{strict: true});	

const User = mongoose.model('User', schema);

module.exports = User;