const { ref, string } = require('joi');
const mongoose = require('mongoose');
const reviewModel = require('./review');

const campGroundSchema = new mongoose.Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  author: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviewModel"
    }
  ]
});

const campground = mongoose.model('campground',campGroundSchema);

module.exports = campground;