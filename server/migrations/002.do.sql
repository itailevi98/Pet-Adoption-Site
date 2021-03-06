CREATE TABLE IF NOT EXISTS pets (
  pet_id                VARCHAR(36) DEFAULT (UUID()),
  type                  VARCHAR(36) NOT NULL,
  name                  VARCHAR(255) NOT NULL, 
  adoption_status       VARCHAR(9) NOT NULL,
  picture               VARCHAR(255) NOT NULL,
  height                DECIMAL(4,2) NOT NULL,
  weight                DECIMAL(4,2) NOT NULL,
  color                 VARCHAR(50) NOT NULL,
  bio                   VARCHAR(255) DEFAULT '',
  hypoallergenic        BOOLEAN NOT NULL,
  dietary_restrictions  VARCHAR(255) DEFAULT 'None',
  breed                 VARCHAR(100) NOT NULL,
  PRIMARY KEY (pet_id)
);