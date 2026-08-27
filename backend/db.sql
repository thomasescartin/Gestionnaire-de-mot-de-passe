CREATE DATABASE general;
USE general;

CREATE TABLE users(
    id_users INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mdp(
    id_mdp INT AUTO_INCREMENT PRIMARY KEY,
    site_name VARCHAR(255) NOT NULL,
    url text NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    mdp VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP;
    updated_at DATETIME,
    id_users INT NOT NULL,
    FOREIGN KEY (id_users) 
        REFERENCES users (id_users)
        ON DELETE CASCADE
);

CREATE TABLE cb (
    id_cb INT AUTO_INCREMENT PRIMARY KEY,
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    card_number TEXT NOT NULL, --Text car INT surpprimme les 0 des nombres 
    CVV VARCHAR(4) NOT NULL,
    date_validated DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    UNIQUE(last_name, first_name, card_number, CVV, date_vidated ),
    id_users INT NOT NULL,
    FOREIGN KEY (id_users) 
        REFERENCES users(id_users)
        ON DELETE CASCADE
);