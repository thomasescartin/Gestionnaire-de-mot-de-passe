const fs = require("fs");
const path = require("path");

const db = require("../config/db");

async function createMigrationsTable() {
  await db.query(`
        CREATE TABLE IF NOT EXISTS migrations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            migration VARCHAR(255) NOT NULL UNIQUE,
            executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

async function migrate() {
  try {
    // Créer la table migrations si nécessaire
    await createMigrationsTable();

    // Récupérer les fichiers du dossier migrations
    const files = fs.readdirSync(__dirname);

    // Garder uniquement les fichiers de migration
    const migrationFiles = files
      .filter((file) => file.endsWith(".js"))
      .filter((file) => file !== "migrate.js")
      .sort();

    // Récupérer les migrations déjà exécutées
    const [executedMigrations] = await db.query(
      "SELECT migration FROM migrations"
    );

    const executedNames = executedMigrations.map((row) => row.migration);

    // Exécuter les nouvelles migrations
    for (const file of migrationFiles) {
      if (executedNames.includes(file)) {
        console.log(`${file} déjà exécutée.`);
        continue;
      }

      console.log(`Exécution de ${file}...`);

      const migration = require(path.join(__dirname, file));

      await migration.up(db);

      await db.query("INSERT INTO migrations (migration) VALUES (?)", [file]);

      console.log(`${file} exécutée avec succès.`);
    }

    console.log("Toutes les migrations sont à jour.");
  } catch (error) {
    console.error("Erreur pendant les migrations :", error);
  } finally {
    await db.end();
  }
}

migrate();
