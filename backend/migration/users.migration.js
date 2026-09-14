module.exports = {
  up: async (db) => {
    await db.query(`
            CREATE TABLE users (
            id_user INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password_hashed VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            failed_login_attempts INT NOT NULL DEFAULT 0,
            locked_until DATETIME NULL)
            `);
  },

  down: async (db) => {
    await db.query(`
          DROP TABLE users  
        `);
  },
};
