var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var doctor = require('./routes/doctor');
var image = require('./routes/image')
var patient = require('./routes/patient');
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var cors = require('cors');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, '/build')));

mongoose
  .connect(
    "mongodb+srv://shweta:UFkSazwQonRwSH4X@cluster0.bopuu.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => console.log("MongoDB connected successfully "))
  .catch(err => console.log(err));

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
    });
    app.options("*", cors());
    app.use('/doctor', doctor);
    app.use('/patient', patient);
    app.use(image);
    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname , '/build/index.html'));
    
  });


module.exports = app;
