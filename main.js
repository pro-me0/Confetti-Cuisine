"use strict";
require('dotenv').config();

const express = require("express"),
  layouts = require("express-ejs-layouts"),
  app = express(),
  router = require("./routes/index"),
  // morgan = require("morgan"),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController.js"),
  usersController = require("./controllers/usersController.js"),
  coursesController = require("./controllers/coursesController.js"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  passport = require("passport"),
  cookieParser = require("cookie-parser"),
  expressSession = require("express-session"),
  expressValidator = require("express-validator"),
  connectFlash = require("connect-flash"),
  User = require("./models/user");

if(process.env.NODE_ENV == 'test'){
  mongoose.connect('mongodb://localhost:27017/r-test',{
    useNewUrlParser: true
  })
}else{
  mongoose.connect("mongodb+srv://mazi:mazi.atlas@procluster.5oeffmz.mongodb.net/confetti" || "mongodb://localhost:27017/lesson18", { useNewUrlParser: true }
  );
}
mongoose.set("useCreateIndex", true);


const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

if (process.env.NODE_ENV === 'test') app.set('port', 3301);
else app.set("port", process.env.PORT || 3300);
app.set("view engine", "ejs");

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);
// app.use(morgan(":method :url :status * :response-timems"))
app.use(layouts);
app.use(express.static("public"));
app.use(expressValidator());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.use(cookieParser("secretCuisine123"));
app.use(
  expressSession({
    secret: "secretCuisine123",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);
app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.authenticate('session'))
app.use(passport.session());
passport.use(User.createStrategy());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});
app.use("/", router);

const server = app.listen(app.get("port"), () => {
  console.clear();
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  if(process.env.NODE_ENV === 'test') console.log('>> this is a test environment<<')
  console.log(`Server running at http://localhost:${app.get("port")}`);
}),
io = require("socket.io")(server),
chatController = require("./controllers/chatController").io(io);

module.exports = app;
