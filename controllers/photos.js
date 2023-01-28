const express = require('express');
//require the Photo
const Photo = require("../models/photo.js");
const cloudinary = require('cloudinary').v2;
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



router.get('/photos/seed', (req, res) => {

    Photo.deleteMany({}, (err, results) => {
        Photo.create(data, (err, photos) => {
            res.redirect('/photos');
        })
    })

    
})

// INDUCES routes

// index route
// Index



router.get("/photos", (req, res) => {
    Photo.find({}, (error, allPhotos) => {
      res.render("index.ejs", {
        photos: allPhotos,
      })
    })  
  })


// new route
router.get("/photos/new", (req, res) => {
    res.render("new.ejs")
  })


// delete route

router.delete("/photos/:id", (req, res) => {
    Photo.findByIdAndDelete(req.params.id, (err, deletedPhoto) => {
// alert are you sure that you want to delete this photo and then offer a button to delete else cancel



      res.redirect("/photos")
    })
  })
// update route
router.put("/photos/:id", (req, res) => {
    if(req.body.completed === "on") {
        req.body.completed = true
    } else {
        req.body.completed = false
    }
    Photo.findByIdAndUpdate(
        req.params.id,
        req.body,
       
        (err, updatedPhoto) => {
            res.redirect(`/photos/`)
        }
    )
})


// create route
router.post('/photos', (req,res) => {
    if(req.body.safeForWork === "on") {
        req.body.safeForWork = true;
    } else {
        req.body.safeForWork = false;
    }
// file upload for images from fileUploader in server.js
    console.log(req.files);

    const coverImage = req.files.imageLink;
    coverImage.mv(`./uploads/${imageLink.name}`);

    cloudinary.uploader.upload(`./uploads/${imageLink.name}`, (err, result) => {
        console.log(err, result);

        req.body.imageLink = result.secure_url;
        
        Photo.create(req.body, (err, createdPhoto) => {
            res.redirect("/photos")
    });

   

    })

})


// edit route
router.get("/photos/:id/edit", (req,res) => {
    Photo.findById(req.params.id, (err, foundPhoto) => {
        res.render("edit.ejs", {
            photo: foundPhoto,
        })
    })
})


// show route
router.get("/photos/:id", (req, res) => {
    Photo.findById(req.params.id, (err, foundPhoto) => {
        res.render("show.ejs", {photo: foundPhoto} )

    })
})

module.exports = router;