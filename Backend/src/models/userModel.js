const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Ensures email is unique
    validate: {
      isEmail: true, // Validates email format
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  },{
        sequelize,
        freezeTableName: true,
        underscored: true,
        timestamps: true,  // Automatically manages `createdAt` and `updatedAt`
        tableName: 'users', // Optional: define table name
  
});

module.exports = User;
