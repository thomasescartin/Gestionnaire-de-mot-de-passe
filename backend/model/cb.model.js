const db = require("../config/db");

const cbModel = {
  // Enregister une carte de crédit
  async createCB({
    last_name,
    first_name,
    card_number,
    CVV,
    date_validated,
    id_user,
  }) {
    const [result] = await db.execute(
      "INSERT INTO cb (last_name, first_name, card_number, CVV, date_validated, id_user) VALUES (?, ?, ?, ?, ?, ?)",
      [last_name, first_name, card_number, CVV, date_validated, id_user]
    );
    return result.insertId;
  },

  // Trouver un carte de crédit avec son id
  async findCB(id_cb) {
    const [rows] = await db.execute(
      "SELECT id_cb, last_name, first_name, card_number, CVV FROM cb WHERE id_cb = ?",
      [id_cb]
    );
    return rows[0] || null;
  },

  //Modifier une carte de crédit
  async updateCB(id_cb, card_number, CVV, updated_at) {
    const [rows] = await db.execute(
      "UPDATE cb SET card_number = ?, CVV = ?, updated_at = ? WHERE id_cb = ?",
      [id_cb, card_number, CVV, updated_at]
    );
    return rows.affectedRows;
  },

  //Suuprimer une carte de crédit
  async deleteCB([id_cb]) {
    const [rows] = await db.execute("DELETE FROM cb WHERE id_cd", [id_cb]);
    return rows.affectedRows;
  },
};
