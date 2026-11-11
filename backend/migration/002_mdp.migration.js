module.exports = {
  up: async (db) => {
    await db.query(`
            CREATE TABLE mdp(
            id_mdp INT AUTO_INCREMENT PRIMARY KEY,
            site_name VARCHAR(255) NOT NULL,
            url text(255) NOT NULL,
            user_name VARCHAR(255) NOT NULL,
            mdp VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME,
            id_user INT NOT NULL,
            FOREIGN KEY (id_user) 
                REFERENCES users (id_user)
                ON DELETE CASCADE
            )`);
  },

  down: async (db) => {
    await db.query(`
          DROP TABLE mdp 
        `);
  },
};
