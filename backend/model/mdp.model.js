const db = require("../config/db");

const mdpModel = {
  // enregistrer un mot de passe
  async createMDP({ site_name, url, user_name, mdp, id_user }) {
    const [result] = await db.execute(
      "INSERT INTO mdp (site_name, url, user_name, mdp, id_user) VALUES (?, ?, ?, ?, ?)",
      [site_name, url, user_name, mdp, id_user]
    );
    return result.insertId;
  },

  //Trouver un mot de passe avec son id
  async findMDP({ id_mdp }) {
    const [rows] = await db.execute(
      "SELECT id_mdp, site_name, url, user_name, mdp FROM mdp WHERE id_mdp = ?",
      [id_mdp]
    );
    return rows[0] || null;
  },

  //Modifier un nom d'utilisateur
  async updateMDPByName({ id_mdp, user_name }) {
    const [result] = await db.execute(
      "UPDATE mdp SET user_name = ? WHERE id_mdp = ?",
      [id_mdp, user_name]
    );
    return result.affectedRows;
  },

  //Modifier un mot de passe
  async updateMDPByPassword({ id_mdp, mdp }) {
    const [result] = await db.execute(
      "UPDATE mdp SET mdp = ? WHERE id_mdp = ?",
      [id_mdp, mdp]
    );
    return result.affectedRows;
  },

  //Supprimer un mot de passe
  async deleteMDP({ id_mdp }) {
    const [result] = await db.execute("DELETE FROM mdp WHERE id_mdp = ?", [
      id_mdp,
    ]);
    return result.affectedRows;
  },
};

module.exports = mdpModel;
