const express = require('express')
const app = express()
require('dotenv').config()
const configViewEngine = require('./config/viewEngine')
const port = process.env.PORT || 8888
const hostname = process.env.HOST_NAME
const webRoutes = require('./routes/web')
const bodyParser = require('body-parser');
const connection = require('./config/database');
const mongoose = require('mongoose');
// config req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
app.use(express.static('public'));
app.use('/', webRoutes);
connection();

const kittySchema = new mongoose.Schema({
  name: String,
});
const Kitten = mongoose.model('Kitten', kittySchema);
const cat = new Kitten({ name: 'Silence' });
cat.save();


(async () => {
  try {
    await connection();
    const { connect, default: mongoose } = require('mongoose')
    app.listen(port, hostname, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } catch (error) {
    console.log(">>> error connect to db", error);
  }
})()