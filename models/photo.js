const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  safeForWork: Boolean,
  imageLink: {
    type: String,
    default: 'https://res.cloudinary.com/ds6pu1vmi/image/upload/v1674694775/omnyy7rbtrskycbkwswi.jpg'
  }

})

module.exports = mongoose.model("Photo", photoSchema)