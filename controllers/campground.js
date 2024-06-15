const path = require('path');
const campgroundModel = require('../models/campground');
const reviewModel = require('../models/review');

module.exports.index = async(req,res) => {
      const campgrounds = await campgroundModel.find();
      res.render("campgrounds/index", { campgrounds });
} 

module.exports.createCampground = async(req,res) => {
    const campground = new campgroundModel(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('sucess',"campground created!!");
    res.redirect("/campgrounds");
}

module.exports.renderForm = (req,res) => {
    res.render("campgrounds/new");
}

module.exports.showCampground = async(req,res) => {
    const campground = await campgroundModel
      .findById(req.params.id).populate({
        path: 'reviews',
        populate:{
          path:'author'
        }
      }).populate('author');
    if(!campground)
    {
      req.flash('error','campground not found!!');
      return res.redirect('/campgrounds');
    } 
    res.render('campgrounds/show',{ campground });
}

module.exports.updateCampground = async(req,res) => {
    const { id } = req.params;
    const update_campground = await campgroundModel.findByIdAndUpdate(id,{...req.body.campground});
    req.flash('sucess','campground updated');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async(req,res) => {
    const { id } = req.params;
    await campgroundModel.findByIdAndDelete(id);
    req.flash('sucess','campground deleted!!');
    res.redirect("/campgrounds");
}

module.exports.renderEditForm = async(req,res) => {
    const { id } = req.params;
    const campground = await campgroundModel.findById(id);
    if (!campground) {
      req.flash('error','campground not found!!');
      res.redirect('/campgrounds');
    }
    if(!campground.author.equals(req.user._id))
      {
        req.flash('error','Not authorized to do that!!');
        return res.redirect(`/campgrounds/${id}`);
      }
    res.render("campgrounds/edit", { campground });
}