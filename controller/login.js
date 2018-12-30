var express = require("express");
var routes = express.Router();
var sha1 = require("sha1");
var session = require("express-session");
var user = require("../model/user");

routes.get("/",function(req,res){
    var pagedata = {title: "login Page", pagename:"login/index", message: req.flash("msg")};
    res.render("layout",pagedata);
});

routes.post("/",function(req,res){
    var u = req.body.email;
    var p = req.body.password;

    user.find({username : u},function(err,result){
        if(err){
          console.log("Login error in controller", err);
          return; }
        if(result.length > 0){
              if(result[0].password == sha1(p)){
                req.session._id = result[0]._id;
                req.session.name = result[0].name;
                req.session.is_user_logged_in = true;
                res.redirect("/dashboard");
            }else{
                req.flash("msg","Password Incorrect");
                res.redirect("/login");
            }
        }else {
            req.flash("msg", "Username & Password Incorrect");
            res.redirect("/login");
        }
    });
});
module.exports = routes;