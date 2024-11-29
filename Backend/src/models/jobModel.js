const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const User = require('./userModel');  // Ensure User Model is imported correctly

// Define the Job model
const Job = sequelize.define('Job', {
  job_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Name of the User table
      key: 'id', // Primary key in the User table
    },
    onDelete: 'CASCADE', // Deletes the job if the associated user is deleted
  },
  // company_id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true,
  //   references: {
  //     model: 'companies', // Name of the Company table
  //     key: 'company_id', // Primary key in the Company table
  //   },
  //   onDelete: 'SET NULL', // Sets `company_id` to NULL if the associated company is deleted
  // },
  // document_id:{
  //   type: DataTypes.INTEGER,
  //   allowNull: true,
  //   foreignkey: true,
  //   references: {
  //       model: 'documents',  // This should match the table name of the Documents model
  //       key: 'document_id',       // The column in the Documents table to which this foreign key is pointing
  //     },
  //     onDelete: 'SET NULL',
  // },
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
    // allowNull: false,
    allowNull: true,
  },
  follow_date: {
    type: DataTypes.DATE,
    allowNull: true,
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

// Define associations
Job.belongsTo(User, { foreignKey: 'user_id' });  // Establishes the foreign key relationship with User

// Export the model
module.exports = Job;