CREATE TABLE IF NOT EXISTS contact_comments (
  comment_id            VARCHAR(36) DEFAULT (UUID()),
  name                  VARCHAR(255) NOT NULL, 
  email                 VARCHAR(255) NOT NULL,
  comment               VARCHAR(255) NOT NULL,
  PRIMARY KEY (comment_id)
);