'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	class Role extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};

	
	Role.init({
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},

		description: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'role',
	});

	return Role;
};