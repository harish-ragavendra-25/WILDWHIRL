const { ref, string } = require('joi');
const mongoose = require('mongoose');
const reviewModel = require('./review');

const imageSchema = new mongoose.Schema({
  url: String,
  filename: String
});

imageSchema.virtual('thumbnail').get(function(){
  return this.url.replace('/upload','/upload/w_200');
});

const campGroundSchema = new mongoose.Schema({
  title: String,
  image: [imageSchema],
  price: Number,
  description: String,
  location: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviewModel",
    },
  ],
});

const campground = mongoose.model('campground',campGroundSchema);

module.exports = campground;