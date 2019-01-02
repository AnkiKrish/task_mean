var express = require("express");
var routes = express.Router();
var user = require("../model/user");
var mongo = require("mongodb");
var session = require("express-session");

routes.get("/",function(req,res)
{
    var id = req.session._id;
    console.log(id);
    user.find({_id : new mongo.ObjectId(id)}, function(err,result)
    {
             if(err)
        {
            console.log("Finding error", err);
            return;
        }
            console.log(result[0]);
        var pagedata = {title: "Dashboard" , pagename:"dashboard/index", result : result[0]};
        res.render("layout",pagedata);
    });
});


routes.get("/edit/:id", function(req,res)
{
    user.find({_id: new mongo.ObjectId(req.params.id)}, function(err,result)
    {
        if(err)
        {
            console.log("Editing profile error", err);
            return;
        }
        var pagedata = {title:"Edit Profile Page", pagename : "dashboard/edit" ,result:result[0]};
        res.render("layout", pagedata);
    });
});

routes.post("/edit",function(req,res)
{
    var where = {_id: new mongo.ObjectId(req.body.id)};
    delete req.body.id;

    user.update(where, req.body , function(err,result)
    {
        if(err)
        {
            console.log("Profile Updation error", err);
            return;

        }
        res.redirect("/dashboard");
    });
});


    


module.exports = routes;