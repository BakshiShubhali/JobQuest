const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  user: "postgres", // userId
  port: 5432,
  password: "4321", // password
  database: "jobquest_db", //Keep this db name
});
client
    .connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });