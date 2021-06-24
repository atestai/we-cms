'use strict';

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};

	User.init({
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},

		name: DataTypes.STRING,
		role_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},

		doctor_id: {
			type: DataTypes.BIGINT,
			defaultValue: 0,
			
			validate: {
				isPatients(value) {
					if (this.role_id === 3 && !value ) {
					  throw new Error('doctor_id not valid');
					}
				  }
			}
		},
		
		email: {
			type: DataTypes.BIGINT,
			validate: {
				isEmail: true, 
			}
		},
		
		username: { 
			type: DataTypes.STRING, 
			unique: true,
			allowNull: false
		},
		
		password: { 
			type: DataTypes.STRING, 
			allowNull: false
		}

	}, {
		sequelize,
		// don't forget to enable timestamps!
		timestamps: true,

		// I don't want createdAt
		createdAt: 'create_at',

		// I want updatedAt to actually be called updateTimestamp
		updatedAt: 'update_at',

		paranoid: true,

		// If you want to give a custom name to the deletedAt column
		deletedAt: 'deleted_at',

    	modelName: 'User',

		tableName : 'users'
	});


	User.belongsTo(User, {
		as: 'Doctor',
		foreignKey: 'doctor_id',
		constraints: false
	});

	//User.belongsTo(User,{foreignKey : 'doctor_id'})

	return User;
};