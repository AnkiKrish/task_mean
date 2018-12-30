var express = require("express");
var routes = express.Router();
var mongodb = require("mongodb");

routes.get("/",function(req,res){
    var pagedata = {title: "Home Page" , pagename:"home/index"};
    res.render("layout",pagedata);
});

module.exports = routes;