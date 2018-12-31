var express = require("express");
var routes= express.Router();
var sha1 = require("sha1");
var session = require("express-session");
var user = require("../model/user");

routes.get("/",function(req,res){
    var pagedata = {title: "login Page",pagename:"login/index"};
    res.render("layout",pagedata);
});
routes.post("/",function(req,res){
    console.log(req.body);
});


module.exports = routes;

