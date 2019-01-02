var express = require("express");
var routes = express.Router();
var session = require("express-session");

routes.use("/",require("../controller/home"));
routes.use("/dashboard",backdoor, require("../controller/dashboard"));
routes.use("/login",require("../controller/login"));
routes.use("/register",require("../controller/register"));
function backdoor(req,res,next){
    if(!req.session.is_user_logged_in){
        res.redirect("/login");
        }
        next();
}

module.exports=routes;