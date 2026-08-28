const argon2 = require("argon2");

exports.passwordHashedMiddleware = async (req, res, next) => {
  try {
    if (req.body.password_hash) {
      req.body.password_hash = await argon2.hash(req.body.password_hash);
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Erreur du hash du mot de passe" });
  }
};
