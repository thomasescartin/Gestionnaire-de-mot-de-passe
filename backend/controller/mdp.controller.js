const mdpModel = require("../model/mdp.model");

//Créer un mot de passe stocké
const CreateMDP = async (req, res) => {
  try {
    const { site_name, url, user_name, mdp } = req.body;
    const existingMdp = await mdpModel.findMDP(req.mdp.id_mdp);
    if (!existingMdp) {
      return res.status(404).json({ message: "Mot de passe introuvable" });
    }

    const id_user = req.user.id_user;

    const mdpid = await mdpModel.createMDP({
      site_name,
      url,
      user_name,
      mdp,
      id_user,
    });

    return res.status(201).json({ message: "Mot de passe créé.", mdpid });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};

//Trouver un mot de passe stocké
const GetMDP = async (req, res) => {
  try {
    const mdp = await mdpModel(req.mdp.id_mdp);
    if (!mdp) {
      return res.status(404).json({ message: "modale introuvable." });
    }
    res.json({
      site_name,
      url,
      user_name,
      mdp,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Changer le mot de passe
const UpgradeMdp = async (req, res) => {
  try {
    const { mdp } = req.body;
    const upgradeMDP = await mdpModel.updateMDPByPassword(req.mdp.id_mdp, mdp);
    if (!upgradeMDP) {
      return res.status(404).json({ message: "Modale introuvable." });
    }
    return res
      .status(201)
      .json({ message: "Mot de passe de la modale modifié." });
  } catch (error) {
    return res.status(500).json({ message: " Erreur serveur" }, error);
  }
};

//Changer le nom d'utilisateur
const UpgradeByUserName = async (req, res) => {
  try {
    const { user_name } = res.body;
    const upgradeUsername = await mdpModel.updateMDPByName(
      req.mdp.id_mdp,
      user_name
    );
    if (!upgradeUsername) {
      return res.status(404).json({ message: "Modale introuvable." });
    }
    return res.status(201).json({ message: "nom d'utlisisateur modifié." });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};

//Supprimer une modale
const DeleteMDP = async (req, res) => {
  try {
    const delMDP = await mdpModel.deleteMDP(req.mdp.id_mdp);
    if (!delMDP) {
      return res.status(404).json({ message: "Modale introuvable." });
    }
    return res.status(201).json({ message: "Modale supprimée." });
  } catch (error) {
    return res.status(500).json({ message: "Erruer serveur", error });
  }
};
