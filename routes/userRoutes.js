const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utilities/catchAsync');
const userModel = require('../models/user');
const { storeretrunTo } = require("../middleware");
const user = require('../controllers/user');

router.route('/register')
    .get(user.registerForm)
    .post(catchAsync(user.addRegisteredUser))

router
  .route("/login")
  .get(user.renderLoginForm)
  .post(
    storeretrunTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    user.AuthenticateUser
  );

router.route('/logout').get(user.logout);

module.exports = router;