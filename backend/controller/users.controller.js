const jwt = require("jsonwebtoken");
require("dotenv/config");

const UserModel = require("../model/users.model");

// Inscription
const Register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe obligatoires.",
      });
    }

    const existingUser = await UserModel.findByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: "Email déjà utilisé.",
      });
    }

    // Le mot de passe doit être hashé côté serveur.
    // Ici, on suppose que le middleware de hashage
    // place le résultat dans req.body.password_hashed.
    const { password_hashed } = req.body;

    if (!password_hashed) {
      return res.status(400).json({
        message: "Mot de passe hashé manquant.",
      });
    }

    const userId = await UserModel.createUser({
      email,
      password_hashed,
    });

    return res.status(201).json({
      message: "Utilisateur créé.",
      userId,
    });
  } catch (error) {
    console.error("Erreur Register :", error);

    return res.status(500).json({
      message: "Erreur interne du serveur.",
    });
  }
};

// Connexion
const Login = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Identifiants incorrects.",
      });
    }

    // On suppose ici que le middleware de vérification
    // du mot de passe a déjà validé les identifiants.
    const token = jwt.sign(
      {
        id_user: user.id_user,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE_IN || "1h",
      }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Erreur Login :", error);

    return res.status(500).json({
      message: "Erreur interne du serveur.",
    });
  }
};

// Modifier l'email
const UpdateEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const id_user = req.user.id_user;

    if (!email) {
      return res.status(400).json({
        message: "Nouvel email obligatoire.",
      });
    }

    const upgrade = await UserModel.updateEmail({
      id_user,
      email,
    });

    if (!upgrade) {
      return res.status(404).json({
        message: "Utilisateur non trouvé.",
      });
    }

    return res.status(200).json({
      message: "Email mis à jour.",
    });
  } catch (error) {
    console.error("Erreur UpdateEmail :", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Cet email est déjà utilisé.",
      });
    }

    return res.status(500).json({
      message: "Erreur interne du serveur.",
    });
  }
};

// Modifier le mot de passe
const UpgradePassword_hashed = async (req, res) => {
  try {
    const { password_hashed } = req.body;
    const id_user = req.user.id_user;

    if (!password_hashed) {
      return res.status(400).json({
        message: "Mot de passe manquant.",
      });
    }

    const upgrade = await UserModel.updatePassword({
      id_user,
      password_hashed,
    });

    if (!upgrade) {
      return res.status(404).json({
        message: "Utilisateur non trouvé.",
      });
    }

    return res.status(200).json({
      message: "Mot de passe mis à jour.",
    });
  } catch (error) {
    console.error("Erreur UpgradePassword :", error);

    return res.status(500).json({
      message: "Erreur interne du serveur.",
    });
  }
};

// Supprimer le compte
const DeleteUser = async (req, res) => {
  try {
    const id_user = req.user.id_user;

    const deleted = await UserModel.deleteUser({
      id_user,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Utilisateur non trouvé.",
      });
    }

    return res.status(200).json({
      message: "Utilisateur supprimé.",
    });
  } catch (error) {
    console.error("Erreur DeleteUser :", error);

    return res.status(500).json({
      message: "Erreur interne du serveur.",
    });
  }
};

module.exports = {
  Register,
  Login,
  UpdateEmail,
  UpgradePassword_hashed,
  DeleteUser,
};
