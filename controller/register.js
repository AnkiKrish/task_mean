var express = require("express");
var routes = express.Router();
var user = require("../model/user");
var sha1 = require("sha1");

routes.get("/",function(_req,res){
    var pagedata = {title: "Register Page", pagename:"register/index"};
    res.render("layout",pagedata);
});

routes.post("/",function(req,res){
    req.body.password = sha1(req.body.password);
    var obj = { first_name:req.body.first, last_name:req.body.last, email:req.body.email };
    delete req.body.first;
    delete req.body.last;
    delete req.body.email;
    var new_obj ={obj : obj, body : req.body};
    user.insert( new_obj ,function(err,result){
        if(err){
            console.log("User register error in controller",err);
            return;  }
            console.log(new_obj);
        res.redirect("/login");
    });
});
module.exports = routes;
