const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    body: String,
    rating: Number,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    }
})

const reviewModel = mongoose.model('reviewModel',reviewSchema);

module.exports = reviewModel;