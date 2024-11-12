const client = require('../config/db.config'); 
const createUserTable = async () => 
  { 
    const createTableQuery = ` CREATE TABLE IF NOT EXISTS user 
    ( userid SERIAL PRIMARY KEY, 
     username VARCHAR(100) NOT NULL, 
     useremail VARCHAR(100) UNIQUE NOT NULL, 
     userpassword VARCHAR(100),
     created_at TIMESTAMPTZ DEFAULT NOW(), 
     updated_at TIMESTAMPTZ DEFAULT NOW() ); `; 
try 
{ 
  await client.query(createTableQuery); 
    console.log("User table created successfully"); 
  } catch (error) 
  { 
    console.error("Error creating user table:", error); 
  } 
}; 
createUserTable();