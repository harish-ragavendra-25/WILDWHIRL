const express = require("express");
const app = express();
const PORT = 3023;
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utilities/ExpressError');

mongoose.connect("mongodb://localhost:27017/wild-whirl")
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs",ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));

const sessionConfig = {
  secret: "thisshouldbebettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  }
};

app.use(session(sessionConfig));
app.use(flash());

const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require('./routes/reviews');

app.use((req,res,next) => {
  res.locals.sucess = req.flash('sucess');
  res.locals.error = req.flash('error');
  next();
})

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/reviews",reviewRoutes);

app.get("/", (req, res) => {
  res.render('home');
});

app.all('*',(req,re,next) => {
  next(new ExpressError());
})

app.use((err,req,res,next) => {
  const {statusCode = 500 } = err;
  if(!err.message) err.message = 'oh no! something went wrong';
  res.status(statusCode).render("error",{ err });
})

app.listen(PORT, () => {
  console.log(`the server listening to ${PORT}`);
});
