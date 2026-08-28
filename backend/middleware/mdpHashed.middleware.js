const argon2 = require("argon2");

exports.mdpHashedmiddleware = async (req, res, next) => {
  try {
    if (req.body.mdp) {
      req.body.mdp = await argon2(req.body.mdp);
    }
    next();
  } catch (error) {
    return res.status(500).json({ messsage: "Erreur de hash du mdp" });
  }
};
