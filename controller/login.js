var express = require("express");
var routes = express.Router();
var user = require("../model/user");
var sha1 = require("sha1");
var flash = require("express-flash");
var session = require("express-session");

routes.get("/", function(req,res)
{
    var pagedata = {title:"Login", pagename:"login/index", msg:req.flash("msg")};
    res.render("layout",pagedata);
});

routes.post("/", function(req,res)
{
    var u = req.body.first;
    var p = req.body.password;
    
   
    user.find({ first : u}, function(err,result)
        {
            if(err)
             {
                 console.log("Query error", err);
                return;
        }
                 if(result.length>0)
                 {   
//                 console.log(result[0]);}
                   if(result[0].password == sha1(p))
            
                 {
                      console.log(result[0].first);
                      req.session._id = result[0]._id;
                      
                      req.session.name = result[0].first;
                      console.log(req.session.name);
                      req.session.is_user_logged_in = true;

                      res.redirect("/dashboard");
      }
            else
            {
                req.flash("msg","Password incorrect");
                res.redirect("/login");
            }
    }
            else
            {
             req.flash("msg","Username and Password incorrect");
             res.redirect("/login");
            }
     });
 });
module.exports=routes;