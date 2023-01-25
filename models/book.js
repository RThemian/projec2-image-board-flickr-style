const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  completed: Boolean,
 // user: { type: Schema.Types.ObjectId, ref: "User" } // this is the relationship between the book and the user
  // how can I add a relationship between the book and the user? 
  // show how to add a relationship between the book and the user

})

module.exports = mongoose.model("Book", bookSchema)