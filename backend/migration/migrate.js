const db = require("../config/db");
const usersMigration = require("./users.migration");

async function migrate() {
  try {
    await usersMigration.up(db);

    console.log("Migration 001 exécutée avec succès.");
  } catch (error) {
    console.error("Erreur pendant la migration :", error);
  } finally {
    await db.end();
  }
}

migrate();
