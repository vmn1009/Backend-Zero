// const mysql = require('mysql2/promise');
require('dotenv').config();
const mongoose = require('mongoose');
// const connection = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT, // default: 3306
//   user: process.env.DB_USER, // default: empty
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });
const dbState = [{ value: 0, label: "disconnected" },
{ value: 1, label: "connected" },
{ value: 2, label: "connecting" },
{ value: 3, label: "disconnecting" }];
const state = Number(mongoose.connection.readyState);
console.log(dbState.find(f => f.value === state).label, "to db");


const connection = async () => {
  try {
    const options ={
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD
    }
    await mongoose.connect(process.env.DB_HOST, options);
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find(f => f.value == state).label, "to do");
  } catch (error) {
    handleError(error);
    console.log(">>> Error connection db: ", error);
  }
}
module.exports = connection;