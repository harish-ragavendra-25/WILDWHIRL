// if(process.env.NODE_ENV != 'production')
// {
//   require('dotenv').config();
// }

require('dotenv').config();

const express = require("express");
const app = express();
const PORT = 3023;
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const ExpressError = require('./utilities/ExpressError');
const userModel = require('./models/user');

const passport = require('passport');
const LocalStrategy = require('passport-local');

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
app.use(mongoSanitize());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/",
    "https://code.jquery.com"
];

const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/",
    "https://fonts.googleapis.com/",
    "https://images.unsplash.com/",
];

const connectSrcUrls = [
    "https://api.maptiler.com/",
];

const fontSrcUrls = [
  "https://fonts.googleapis.com",
];

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'",...connectSrcUrls],
      scriptSrc: ["'unsafe-inline'","'self'", ...scriptSrcUrls],
      styleSrc: ["'self'","'unsafe-inline'",...styleSrcUrls],
      workerSrc: ["'self'","blob:"],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://res.cloudinary.com/dhknjqigy/",
        "https://images.unsplash.com/",
        "https://api.maptiler.com/resources/logo.svg"
      ],
      fontSrc: ["'self'",...fontSrcUrls],
    },
  })
)


const sessionConfig = {
  name:'session',
  secret: "thisshouldbebettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure:true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  }
};

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(userModel.authenticate()));

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/userRoutes');
const { connect } = require('http2');

app.use((req,res,next) => {
  console.log(process.env.NODE_ENV);
  res.locals.currentUser = req.user;
  res.locals.sucess = req.flash('sucess');
  res.locals.error = req.flash('error');
  next();
})

app.use("/",userRoutes);
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
