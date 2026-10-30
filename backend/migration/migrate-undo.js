const db = require("../config/db");
const fs = require("fs");
const path = require("path");

async function migrateUndo() {
  try {
    // Récupérer la dernière migration exécutée
    const [rows] = await db.query(`
            SELECT migration
            FROM migrations
            ORDER BY id DESC
            LIMIT 1
        `);

    // Aucune migration à annuler
    if (rows.length === 0) {
      console.log("Aucune migration à annuler.");
      return;
    }

    const migrationName = rows[0].migration;

    console.log(`Annulation de ${migrationName}...`);

    // Charger la migration
    const migration = require(path.join(__dirname, migrationName));

    // Exécuter down()
    await migration.down(db);

    // Supprimer la migration de l'historique
    await db.query("DELETE FROM migrations WHERE migration = ?", [
      migrationName,
    ]);

    console.log(`${migrationName} annulée avec succès.`);
  } catch (error) {
    console.error("Erreur pendant l'annulation de la migration :", error);
  } finally {
    await db.end();
  }
}

migrateUndo();
