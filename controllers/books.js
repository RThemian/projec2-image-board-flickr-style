const express = require('express');
//require the Book
const Book = require("../models/book.js");

const router = express.Router();
/*
 router gives these methods: 
 1) .get()
 2) .post()
 3) .put()
 4) .delete()
*/

// seed route
const data = require('../data');



router.get('/books/seed', (req, res) => {

    Book.deleteMany({}, (err, results) => {
        Book.create(data, (err, books) => {
            res.redirect('/books');
        })
    })

    
})

// INDUCES routes

// index route
// Index
router.get("/", (req, res) =>{
    res.redirect("/books");
})


router.get("/books", (req, res) => {
    Book.find({}, (error, allBooks) => {
      res.render("index.ejs", {
        books: allBooks,
      })
    })  
  })


// new route
router.get("/books/new", (req, res) => {
    res.render("new.ejs")
  })


// delete route

router.delete("/books/:id", (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, deletedBook) => {
      res.redirect("/books")
    })
  })
// update route
router.put("/books/:id", (req, res) => {
    if(req.body.completed === "on") {
        req.body.completed = true
    } else {
        req.body.completed = false
    }
    Book.findByIdAndUpdate(
        req.params.id,
        req.body,
       
        (err, updatedBook) => {
            res.redirect(`/books/`)
        }
    )
})


// create route
router.post('/books', (req,res) => {
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
router.get("/books/:id/edit", (req,res) => {
    Book.findById(req.params.id, (err, foundBook) => {
        res.render("edit.ejs", {
            book: foundBook,
        })
    })
})


// show route
router.get("/books/:id", (req, res) => {
    Book.findById(req.params.id, (err, foundBook) => {
        res.render("show.ejs", {book: foundBook} )

    })
})

module.exports = router;