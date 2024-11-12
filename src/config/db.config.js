const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  user: "postgres", // userId
  port: 5432,
  password: "1218", // password
  database: "jobquest_db", //Keep this db name
});
client
    .connect()
    .then(() => {
        console.log('Successfully Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });