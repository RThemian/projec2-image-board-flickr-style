//require dependencies

const express = require('express');
const mongoose = require('mongoose');

const booksRouter = require('./controllers/books.js');
const methodOverride = require("method-override");

// create express app
const app = express();


// configure settings
//this must come before any process.env variables are used
require('dotenv').config();


//connect to database
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL);


const db = mongoose.connection;

db.on('error', (err) => console.error(err.message + ' is Mongo not running?'));
db.on('connected', () => console.log('mongoDB connected: '));


// mount middleware
//grab form data and add it to req.body
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(booksRouter);





const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
