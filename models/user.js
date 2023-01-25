const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// a schema is a blueprint for a model which has fields and data types. Each field is a property of the model.

const userSchema = new Schema({
    email: {
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
    },
    password: {
        type: String, 
        required: true
    },

}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);