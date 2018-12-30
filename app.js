var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var routes = require("./config/routes");
var sha1 = require("sha1");
var session = require("express-session");
var flash = require("express-flash");
var nocache = require("nocache");

app.set("view engine", "ejs");

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({ extended:true}));
app.use(session({secret : "MyCHOICE"}));
app.use(flash());
app.use(nocache());
//app.use(sha1());


app.use(function(req,res,next){
    res.locals.session = req.session;
    next(); });

app.use(routes);    
app.listen(3080,function(){
        console.log("Server is Running on port 3080");
});