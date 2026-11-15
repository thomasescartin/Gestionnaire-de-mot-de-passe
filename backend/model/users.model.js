const db = require("../config/db.js");

const UserModel = {
  //Créer un utilisateur
  async createUser({ email, password_hash }) {
    const [result] = await db.execute(
      "INSERT INTO users (email, password_hash ) VALUES (?, ?)",
      [email, password_hash]
    );
    return result.insertId;
  },

  //Trouver un utilisateur avec son email
  async findByEmail(email) {
    const [rows] = await db.execute(
      "SELECT id_user, email, password_hash FROM users WHERE email = ?",
      [email]
    );
    return rows[0] || null;
  },

  //Trouver un utilisateur avec son id
  async findById(id_user) {
    const [rows] = await db.execute(
      "SELECT id_user, email, password_hash FROM users WHERE id = ?",
      [id_user]
    );
    return rows[0] || null;
  },

  //Modifier un utilisateur
  async updateUser({ id_user, email, password_hash }) {
    const [result] = await db.execute(
      " UPDATE users set email = ?, password_hash = ? WHERE id_user = ?",
      [id_user, email, password_hash]
    );
    return result.affectedRows;
  },

  //Supprimer un utilisateur
  async deleteUser({ id_user }) {
    const [result] = await db.execute("DELETE FROM users WHERE id_user = ?", [
      id_user,
    ]);
    return result.affectedRows;
  },
};

module.exports = UserModel;
