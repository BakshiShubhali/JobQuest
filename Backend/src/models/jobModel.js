const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Job = sequelize.define('Job', {
  job_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // foreignkey: true,
    references: {
        model: 'users',  // This should match the table name of the Users model
        key: 'user_id',       // The column in the User table to which this foreign key is pointing
      },
  },
  document_id:{
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
        model: 'documents',  // This should match the table name of the Documents model
        key: 'document_id',       // The column in the Documents table to which this foreign key is pointing
      },
  },
  company_id: {
    type: DataTypes.INTEGER,
    unique: true,
    references: {
        model: 'companies',  // This should match the table name of the Companies model
        key: 'company_id',       // The column in the Companies table to which this foreign key is pointing
      },
  },
  job_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_category: {
    type: DataTypes.ENUM,
    values: ['Fresher', 'Intermediate', 'Experienced'],
    allowNull: false,
  },
  job_type: {
    type: DataTypes.ENUM,
    values: ['Remote', 'Full-Time', 'Part-Time', 'Contract'],
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '0'
  },
  job_status: {
    type: DataTypes.ENUM,
    values: ['Applied', 'Rejected', 'Interview-Scheduled'],
    allowNull: false,
  },
  job_board: {
    type: DataTypes.ENUM,
    values: ['LinkedIn', 'Indeed'],
    allowNull: true,
  },
  applied_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  follow_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  personal_note: {
    type: DataTypes.STRING,
    allowNull: true,
  }
},{
        sequelize,
        freezeTableName: true,
        underscored: true,
        timestamps: true,  // Automatically manages `createdAt` and `updatedAt`
       tableName: 'jobs', // Optional: define table name
  
});

const Document = sequelize.define('Document', {
    document_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    document_name:{
      type: DataTypes.STRING, 
      allowNull: true,
    },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // foreignkey: true,
      references: {
          model: 'jobs',  // This should match the table name of the jobs model
          key: 'jobs_id',       // The column in the jobs table to which this foreign key is pointing
        },
    },
    document_type:{
        type: DataTypes.ENUM,
        values: ['pdf', 'docx','txt'],  // List of document types
        allowNull: false,
    },    
  },{
          sequelize,
          freezeTableName: true,
          underscored: true,
          timestamps: true,  // Automatically manages `createdAt` and `updatedAt`
         tableName: 'documents', // Optional: define table name
    
});

module.exports = Job;
module.exports = Document;
