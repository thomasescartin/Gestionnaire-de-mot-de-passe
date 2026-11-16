const jwt = require("jsonwebtoken");
require("dotenv/config");
const UserModel = require("../model/users.model");

// Register
const Register = async (req, res) => {
  try {
    const { email, password_hash } = req.body;
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }
    const userid = await UserModel.createUser({
      email,
      password_hash,
    });
    return res.status(201).json({ message: "Utilisateur créé.", userid });
  } catch (error) {
    return res.status(500).json({ message: "Erreur du serveur.", error });
  }
};

//Login
const Login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findByEmail(email);
    if (!user) {
      res.status(400).json({ message: "Utilisateur introuvable" });
    }
    const token = jwt.sign(
      {
        id: user.id_user,
        email: user.email,
      },
      process.env.JWT,
      process.env.JWT_EXPIRE_IN || "1h"
    );
    res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Erreur du serveur", error });
  }
};

//Update email
const UpdateEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const upgrade = await UserModel.updateUser(req.user.id_user, email);
    if (!upgrade) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    return res.json({ message: "Email mis à jour" });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur.", error });
  }
};

//Upgrade password
const UpgradePassword_hash = async (req, res) => {
  try {
    const { password_hash } = req.body;
    const upgrade = await UserModel.updateUser(req.user.id_user, password_hash);
    if (!upgrade) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }
    return res.status(201).json({ message: "Mot de passe mis à jour." });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur.", error });
  }
};

//Delete user
const DeleteUser = async (req, res) => {
  try {
    const del = await UserModel.deleteUser(req.user.id_user);
    if (!del) {
      return res.status(404).json({ message: "utilisateur non trouvé." });
    }
    return res.status(201).json({ message: "Utilisateur supprimé." });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};

module.exports = {
  Register,
  Login,
  UpdateEmail,
  UpgradePassword_hash,
  DeleteUser,
};
