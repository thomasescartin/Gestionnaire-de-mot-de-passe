const cbModel = require("../model/cb.model");

// Créer les carte de crédit
const CreateCB = async (req, res) => {
  try {
    const { last_name, first_name, card_number, CVV, date_validated } =
      req.body;
    //Be sur credit card don-t exist
    const existingCB = await cbModel.findCB(req.cb.id_cb);
    if (!existingCB) {
      return res
        .status(400)
        .json({ message: "Carte de crédit déjà existante." });
    }

    const id_user = req.user.id_user;

    const cbid = await cbModel.createCB({
      last_name,
      first_name,
      card_number,
      CVV,
      date_validated,
      id_user,
    });
    return res
      .status(201)
      .json({ message: "Carte de crédit enregistrée.", cbid });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur.", error });
  }
};

//Trouver les cartes de crédit
const FindCB = async (req, res) => {
  try {
    const cb = await cbModel.findCB(req.cb.id_cb);

    if (!cb) {
      return res.status(404).json({ message: "Carte de crédit introuvable" });
    }

    res.json({
      id_cb: cb.id_cb,
      last_name: cb.last_name,
      first_name: cb.first_name,
      card_number: cb.card_number,
      CVV: cb.CVV,
      date_validated: cb.date_validated,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};

//Modifier les cartes de crédit
const UpdateCB = async (req, res) => {
  try {
    const { card_number, CVV, updated_at } = req.body;
    const cb = await cbModel.updateCB(
      req.cb.id_cb,
      card_number,
      CVV,
      updated_at
    );
    if (!cb) {
      return res.status(404).json({ message: "Carte de crédit introuvable." });
    }
    return res.status(201).json({ message: "Carte de crédit mise à jour." });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};

//Supprimer les cartes de crédit
const DeleteCB = async (req, res) => {
  try {
    const delCB = await cbModel.deleteCB(req.cb.id_cb);
    if (!delCB) {
      return res.status(404).json({ message: "Carte de crédit introuvable" });
    }
    return res.status(201).json({ message: "carte de crédit supprimée." });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur.", error });
  }
};

module.exports = { CreateCB, FindCB, UpdateCB, DeleteCB };
