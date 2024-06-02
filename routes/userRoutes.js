const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utilities/catchAsync');
const userModel = require('../models/user');

router.get("/register", (req,res) => {
    res.render('users/register');
});

router.post("/register", catchAsync(async(req,res) => {
    try {
        const { email, username, password } = req.body;
        const user = new userModel({ email, username });
        const registeredUser = await userModel.register(user, password);
        console.log(registeredUser);
        req.flash("sucess", `Welcome to Wild Whirl....${username}`);
        res.redirect("/campgrounds");
    } catch (error) {
        req.flash("error",error.message);
        res.redirect('/register');
    }
}));

router.get('/login',(req,res) => {
    res.render('users/login');
})

router.post('/login',passport.authenticate('local', { failureFlash: true,failureRedirect: '/login'}),(req,res) => {
    res.redirect('/campgrounds');
})




module.exports = router;