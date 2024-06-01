const campgroundModel = require('../models/campground');

module.exports.index = async(req,res) => {
      const campgrounds = await campgroundModel.find();
      res.render("campgrounds/index", { campgrounds });
} 

module.exports.createCampground = async(req,res) => {
    const campground = new campgroundModel(req.body.campground);
    await campground.save();
    res.redirect("/campgrounds");
}

module.exports.renderForm = (req,res) => {
    res.render("campgrounds/new");
}

module.exports.showCampground = async(req,res) => {
    const campground = await campgroundModel.findById(req.params.id);
    if(!campground)
    {
      res.send('campground not found');
    } 
    res.render('campgrounds/show',{ campground });
}

module.exports.updateCampground = async(req,res) => {
    const { id } = req.params;
    const campground = await campgroundModel.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async(req,res) => {
    const { id } = req.params;
    await campgroundModel.findByIdAndDelete(id);
    res.redirect("/campgrounds");
}

module.exports.renderEditForm = async(req,res) => {
    const { id } = req.params;
    const campground = await campgroundModel.findById(id);
    if (!campground) {
      res.send("the camground not found");
    }
    res.render("campgrounds/edit", { campground });
}