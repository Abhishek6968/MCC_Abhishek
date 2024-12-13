CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);


INSERT INTO roles (role_name) VALUES ('Superadmin'), ('State Admin'), ('Region Admin'), ('Center User');

CREATE TABLE states (
    state_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE regions (
    region_id INT AUTO_INCREMENT PRIMARY KEY,
    state_id INT NOT NULL,
    region_name VARCHAR(100) UNIQUE NOT NULL,
    FOREIGN KEY (state_id) REFERENCES states(state_id)
);

CREATE TABLE user_category (
    u_id INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO user_category (user) VALUES ('Government Hospital'), ('Private Hospital'), ('PHC');

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    role_id INT NOT NULL,
    state_id INT DEFAULT NULL,
    region_id INT DEFAULT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (state_id) REFERENCES states(state_id),
    FOREIGN KEY (region_id) REFERENCES regions(region_id)
);

CREATE TABLE passwords (
    user_id INT PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE user_center (
    region_id INT NOT NULL,
    u_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    contact_no VARCHAR(15) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY (region_id) REFERENCES regions(region_id),
    FOREIGN KEY (u_id) REFERENCES user_category(u_id)
);

ALTER TABLE regions DROP FOREIGN KEY regions_ibfk_1;
ALTER TABLE regions
    -> ADD CONSTRAINT fk_state_id
    -> FOREIGN KEY (state_id) REFERENCES states(state_id)
    -> ON DELETE CASCADE;


ALTER TABLE user_center DROP FOREIGN KEY user_center_ibfk_1;
ALTER TABLE user_center 
ADD CONSTRAINT fk_user_center_region_id 
FOREIGN KEY (region_id) REFERENCES regions(region_id) 
ON DELETE CASCADE;
DROP TABLE user_center which is created above and execute below code
CREATE TABLE user_center (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- Primary Key for unique identification
    region_id INT NOT NULL,                 -- Foreign Key referencing regions
    u_id INT NOT NULL,                      -- Foreign Key referencing user_category
    name VARCHAR(100) NOT NULL,             -- Name of the center
    contact_no VARCHAR(15) NOT NULL,        -- Contact number of the center
    email VARCHAR(255) UNIQUE NOT NULL,     -- Email of the center, must be unique
    FOREIGN KEY (region_id) REFERENCES regions(region_id) ON DELETE CASCADE,
    FOREIGN KEY (u_id) REFERENCES user_category(u_id)
);


