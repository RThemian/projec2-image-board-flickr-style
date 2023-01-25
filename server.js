//require dependencies

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const booksRouter = require('./controllers/books.js');
const methodOverride = require("method-override");
const userRouter = require('./controllers/users.js');
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
// grab form data and add it to req.body
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
    })
);
// session secret is used to encrypt the session cookie and prevent tampering, it should be a long string of random characters
// resave is set to false because we don't want to save the session if nothing has changed (it is a performance optimization)
// saveUninitialized is set to false because we don't want to save an empty value for the session if a user is not logged in (it is a performance optimization)

app.use((req, res, next) => {
    // custom middleware to inspect the session
    console.log(req.session);
    next(); // this is a middleware function that will run on every request and log the session to the console, runs the next function in the middleware stack

});

// authenication middleware
function isAuthenticated(req, res, next) {
    if(!req.session.userId) {
        res.locals.user = null;
        return res.redirect('/login'); 
    }
    res.locals.user = req.session.userId; // this is the id of the user in the database that is logged in
    // res.locals is an object that is available in all of the views and can be used to pass data to the views
    next();
}

// routes
app.get('/', (req, res) => {
    res.render("home.ejs");})

app.use(userRouter);


app.use(isAuthenticated, booksRouter); // isAuthenticated is a middleware function that will run on every request to the books route and checks to see if the user is logged in, if not, it will redirect to the login page




const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
