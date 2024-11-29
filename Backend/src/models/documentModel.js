const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ensure this file exports a configured Sequelize insta
const Job = require('../models/jobModel'); // Ensure Job Model is imported correctly

// Define the Document model
const Document = sequelize.define('Document', {
    document_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    document_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255], // Restrict length
      },
    },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'jobs', // Name of the table Job is mapped to
        key: 'job_id', // Primary key in the Job table
      },
      onDelete: 'CASCADE', // Deletes the document if the associated job is deleted
    },
    document_type:{
        type: DataTypes.ENUM,
        values: ['pdf', 'docx','txt'],  // List of document types
        allowNull: true,
    },  
    file_path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }, 
    },
  },{
      sequelize,
      freezeTableName: true,
      underscored: true,
      timestamps: true,  // Adds `createdAt` and `updatedAt` columns
      tableName: 'documents', // Explicitly sets the table name
      indexes: [
        {
          fields: ['job_id'],
        },
      ], 
});

// Define associations
Document.belongsTo(Job, { foreignKey: 'job_id' });  // Establishes the foreign key relationship with Job

// Export the model
module.exports = Document;
