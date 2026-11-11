module.exports = {
  up: async (db) => {
    await db.query(`
            CREATE TABLE cb (
            id_cb INT AUTO_INCREMENT PRIMARY KEY,
            last_name VARCHAR(255) NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            card_number TEXT(255) NOT NULL,
            CVV VARCHAR(4) NOT NULL,
            date_validated DATE NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME,
            UNIQUE(last_name, first_name, CVV, date_vidated ),
            id_users INT NOT NULL,
            FOREIGN KEY (id_users) 
                REFERENCES users(id_users)
                ON DELETE CASCADE
            );
        `);
  },

  down: async (db) => {
    await db.query(`
          DROP TABLE cb 
        `);
  },
};
// Pas de contrainte avec TEXT
