const express = require("express");

const router = express.Router();

const User = require("../models/user.js");

const bcrypt = require("bcrypt");
const { application } = require("express");

// sign up users

//provide sign up form
router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

// handle form submission
router.post("/signup", (req, res) => {
// hash the password
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
// set the password to the hashed password and the second param is the number of times you want to salt it
    req.body.password = hashedPassword;

  User.create(req.body, (err, newUser) => {
    // create a session for the new user
    req.session.userId = newUser._id;
    res.redirect("/books");
  });
});

// login users
// provide login form
router.get('/login', (req, res) => {
    res.render('login.ejs');
});

// handle form submission
router.post('/login', (req, res) => {
    // 1. find the user in the database
    // find user based on email
    User.findOne({email: req.body.email}, (err, foundUser) => {
    // 1.1 if the user exists, check the password to see if it matches
    // foundUser is null if the user doesn't exist
    if (!foundUser) {
           // 1.2 if the user doesn't exist, redirect to login page
        return res.redirect('/login');
    }
    // 2. Assuming the user exists, use bcrypt to compare the plain text password with the hashed+salted password

    const isMatched = bcrypt.compareSync(req.body.password, foundUser.password); // returns true or false boolean
    // 2.1 if the passwords don't match, redirect to the login page
    if (!isMatched) {
        return res.redirect('/login');
    }
    // session is a property of the request object
    // session is an object that is stored in the database
    // create a session for the authenticated user
    req.session.userId = foundUser._id; // this is the id of the user in the database that is logged in 
    // 2.2 if the passwords match, redirect to the books index page
    res.redirect('/books');
    });
});
    

// logout users
router.get("/logout", (req, res) => {
    // destroy the session
    req.session.destroy((err) => {
        res.redirect("/login");
    });
});




module.exports = router;
