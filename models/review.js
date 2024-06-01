const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    body: String,
    rating: Number,
    author: String
})

const reviewModel = mongoose.model('reviewModel',reviewSchema);

module.exports = reviewModel;