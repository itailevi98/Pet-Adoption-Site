CREATE TABLE IF NOT EXISTS users (
  id                 VARCHAR(36) DEFAULT (UUID()),
  email              VARCHAR(255) NOT NULL UNIQUE,
  password_hash      VARCHAR(255) NOT NULL,
  first_name         VARCHAR(255) NOT NULL,
  last_name          VARCHAR(255) NOT NULL,
  phone_number       VARCHAR(10) NOT NULL,
  created_date       DATETIME DEFAULT (NOW()),
  role               VARCHAR(10) DEFAULT 'user',
  PRIMARY KEY (id)
);