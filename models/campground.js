const mongoose = require('mongoose');

const campGroundSchema = new mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    author: String
})

const campground = mongoose.model('campground',campGroundSchema);

module.exports = campground;