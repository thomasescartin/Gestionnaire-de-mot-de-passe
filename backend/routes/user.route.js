const express = require("express");
const RouteUser = require("../controller/users.controller");
const {
  authentificationMiddleware,
} = require("../middleware/authentification.middleware");
const userRoute = express.Router();

//Route d'authentification
userRoute.post("/register", RouteUser.Register);
userRoute.post("/login", RouteUser.Login);

//Route des utilisateurs
// userRoute.get("/finduser");
userRoute.put(
  "/upgradeEmail",
  authentificationMiddleware,
  RouteUser.UpdateEmail
);
userRoute.put(
  "/upgradePassword",
  authentificationMiddleware,
  RouteUser.UpgradePassword_hashed
);
userRoute.delete("/delete", authentificationMiddleware, RouteUser.DeleteUser);

module.exports = { userRoute };
