-- This file can be deleted upon completion of SQL-related work, as it is for reference. 

INSERT INTO results (title, location, description, link, companyName, apiWebsite, apiId)
VALUES ('test title 3', 'test location 3', 'test description 3', 'www.test-link.com/3', 'test company 3', 'test-api-3', 3);

CREATE TABLE users (
  id SERIAL,
  username varchar(255),
  password varchar(255),
  googleId varchar(255)
);

INSERT INTO users (username, password, googleId)
VALUES ('test1', 'test1', 'test1');

CREATE TABLE users_saved_results (
  id SERIAL,
  userId int,
  resultId int
);

INSERT INTO users_saved_results (userId, resultId)
VALUES (1, 3);
