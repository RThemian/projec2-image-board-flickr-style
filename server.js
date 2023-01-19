//require dependencies
const express = require('express');
const mongoose = require('mongoose');

const Book = require("./models/book.js");

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

// seed route

// INDUCES routes

// index route
// Index
app.get("/", (req, res) =>{
    res.redirect("/books");
})


app.get("/books", (req, res) => {
    Book.find({}, (error, allBooks) => {
      res.render("index.ejs", {
        books: allBooks,
      })
    })  
  })


// new route
app.get("/books/new", (req, res) => {
    res.render("new.ejs")
  })


// delete route

// update route

// create route
app.post('/books', (req,res) => {
    if(req.body.completed === "on") {
        req.body.completed = true;
    } else {
        req.body.completed = false;
    }

    Book.create(req.body, (err, createdBook) => {
       res.redirect("/books")

    })

})


// edit route

// show route
app.get("/books/:id", (req, res) => {
    Book.findById(req.params.id, (err, foundBook) => {
        res.send(foundBook)
        
    })
})





const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
