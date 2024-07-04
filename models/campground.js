const mongoose = require('mongoose');
const reviewModel = require('./review');
const { coordinates } = require('@maptiler/client');
const { string, required } = require('joi');

const opts = { toJSON: { virtuals:true }};

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
  geometry:{
    type:{
      type:String,
      enum:['Point'],
      required:true
    },
    coordinates:{
      type:[Number],
      required:true
    }
  },
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
},opts);

campGroundSchema.virtual("properties.popUpMarkup").get(function () {
  return `
        <strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
        <p>${this.description.substring(0,40)}...</p>
  `;
});

const campground = mongoose.model('campground',campGroundSchema);

module.exports = campground;