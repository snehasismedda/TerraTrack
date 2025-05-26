const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require('express-flash');
const passport= require("passport");
const LocalStrategy=require("passport-local");
const User= require("./models/user.js");

if(process.env.NODE_ENV !="production"){
  require('dotenv').config();
}

const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/review.js");
const userRoutes= require("./routes/user.js");
const searchRoutes= require("./routes/search")
const ExpressError = require("./utils/ExpressError.js");
const { isLoggedIn } = require("./middleware.js");

const app = express();
const port = 8080;
const dbURL = process.env.ATLAS_DB_URL;

// DB Connection
async function main() {
  await mongoose.connect(dbURL);
}
main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// View Engine Setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, // time period in seconds
});

store.on("error", (err) => {
  console.log("Error in Mongo session store:", err);
});

const sessionOptions = {
  store,
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser= req.user;
  next();
});


// Routes
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/search", searchRoutes);
app.get("/bookings", isLoggedIn, (req, res) => {
  res.render("reservation/details");
});
app.use("/", userRoutes);

// 404 Handler
app.all('/{*any}', (req, res, next) => {
  throw new ExpressError(404, "Page not found");
})

// Global Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  res.status(statusCode).render("error.ejs", { err });
});

// Server Start
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
