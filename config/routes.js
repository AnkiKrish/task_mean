var express = require("express");
var routes = express.Router();

routes.use("/",require("../controller/home"));
//routes.use("/dashboard",require("../controller/dashboard"));
routes.use("/login",require("../controller/login"));
routes.use("/register",require("../controller/register"));

module.exports=routes;