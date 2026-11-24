const express = require("express");
const RouteUser = require("../controller/users.controller");

const userRoute = express.Router();

//Route d'authentification
userRoute.post("/register", RouteUser.Register);
userRoute.post("/login", RouteUser.Login);

//Route des utilisateurs
// userRoute.get("/finduser");
userRoute.put("/upgradeEmail", RouteUser.UpdateEmail);
userRoute.put("/upgradePassword", RouteUser.UpgradePassword_hashed);
userRoute.delete("/delete", RouteUser.DeleteUser);

module.exports = { userRoute };
