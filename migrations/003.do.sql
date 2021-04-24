CREATE TABLE IF NOT EXISTS user_pets (
  user_id               VARCHAR(36) NOT NULL,
  pet_id                VARCHAR(36) NOT NULL,
  saved                 BOOLEAN DEFAULT 0,
  owned                 BOOLEAN DEFAULT 0,                 
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (pet_id) REFERENCES pets(pet_id)
);