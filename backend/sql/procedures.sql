-- DELIMITER $$

-- CREATE PROCEDURE RegisterUser(
--     IN p_email VARCHAR(255),
--     IN p_password VARCHAR(255),
--     IN p_role_id INT,
--     IN p_state_id INT,
--     IN p_region_id INT
-- )
-- BEGIN
--     DECLARE hashed_id VARCHAR(6); -- Declare a 6-character user ID
--     DECLARE salt VARCHAR(255);
--     DECLARE hashed_password VARCHAR(255);

--     -- Generate a 6-digit unique user ID
--     SET hashed_id = LPAD(FLOOR(RAND() * 1000000), 6, '0'); -- Ensures 6 digits

--     -- Generate a random salt
--     SET salt = LEFT(UUID(), 16);

--     -- Hash the password with the generated salt
--     SET hashed_password = SHA2(CONCAT(p_password, salt), 256);

--     -- Insert into users table, allowing NULL for state_id and region_id
--     INSERT INTO users (user_id, email, role_id, state_id, region_id)
--     VALUES (hashed_id, p_email, p_role_id, p_state_id, p_region_id);

--     -- Insert into passwords table
--     INSERT INTO passwords (user_id, password, salt)
--     VALUES (hashed_id, hashed_password, salt);
-- END$$

-- DELIMITER ;


-- DELIMITER $$

-- CREATE PROCEDURE LoginUser(
--     IN p_email VARCHAR(255),
--     IN p_password VARCHAR(255),
--     OUT p_is_valid BOOLEAN,
--     OUT p_user_id VARCHAR(6),
--     OUT p_role_id INT
-- )
-- BEGIN
--     DECLARE stored_hash VARCHAR(255);
--     DECLARE stored_salt VARCHAR(255);

--     -- Initialize output variables
--     SET p_is_valid = FALSE;
--     SET p_user_id = NULL;
--     SET p_role_id = NULL;

--     -- Retrieve the stored password hash, salt, and role for the provided email
--     SELECT p.password, p.salt, u.user_id, u.role_id
--     INTO stored_hash, stored_salt, p_user_id, p_role_id
--     FROM users u
--     JOIN passwords p ON u.user_id = p.user_id
--     WHERE u.email = p_email;

--     -- Validate the provided password
--     IF SHA2(CONCAT(p_password, stored_salt), 256) = stored_hash THEN
--         SET p_is_valid = TRUE;
--     END IF;
-- END$$

-- DELIMITER ;


DELIMITER $$

CREATE PROCEDURE AddState(
    IN p_state_name VARCHAR(100)
)
BEGIN
    INSERT INTO states (name) VALUES (p_state_name);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE AddRegion(
    IN p_region_name VARCHAR(100),
    IN p_state_id INT
)
BEGIN
    INSERT INTO regions (region_name, state_id) VALUES (p_region_name, p_state_id);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE AddCenter(
    IN p_region_id INT,
    IN p_u_id INT,
    IN p_name VARCHAR(100),
    IN p_contact_no VARCHAR(15),
    IN p_email VARCHAR(255)
)
BEGIN
    INSERT INTO user_center (region_id, u_id, name, contact_no, email)
    VALUES (p_region_id, p_u_id, p_name, p_contact_no, p_email);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE ViewStates()
BEGIN
    SELECT state_id, name FROM states;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE RemoveState(
    IN p_state_id INT
)
BEGIN
    DELETE FROM states WHERE state_id = p_state_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE ViewRegions(
    IN p_state_id INT
)
BEGIN
    IF p_state_id IS NULL THEN
        -- Fetch all regions
        SELECT region_id, state_id, region_name FROM regions;
    ELSE
        -- Fetch regions for a specific state
        SELECT region_id, state_id, region_name FROM regions WHERE state_id = p_state_id;
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE DeleteRegion(
    IN p_region_id INT
)
BEGIN
    DELETE FROM regions WHERE region_id = p_region_id;
END$$

DELIMITER ;
DELIMITER $$

CREATE PROCEDURE EditState(
    IN p_state_id INT,
    IN p_state_name VARCHAR(100)
)
BEGIN
    UPDATE states
    SET name = p_state_name
    WHERE state_id = p_state_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE ViewUserCenters(
    IN p_region_id INT
)
BEGIN
    IF p_region_id IS NULL THEN
        -- Fetch all centers
        SELECT region_id, u_id, name, contact_no, email FROM user_center;
    ELSE
        -- Fetch centers for a specific region
        SELECT region_id, u_id, name, contact_no, email 
        FROM user_center
        WHERE region_id = p_region_id;
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE EditUserCenterById(
    IN p_id INT,
    IN p_name VARCHAR(100),
    IN p_contact_no VARCHAR(15),
    IN p_email VARCHAR(255)
)
BEGIN
    UPDATE user_center
    SET 
        name = COALESCE(p_name, name),                -- Update only if p_name is not NULL
        contact_no = COALESCE(p_contact_no, contact_no),  -- Update only if p_contact_no is not NULL
        email = COALESCE(p_email, email)             -- Update only if p_email is not NULL
    WHERE id = p_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE DeleteUserCenterById(
    IN p_id INT
)
BEGIN
    DELETE FROM user_center WHERE id = p_id;
END$$

DELIMITER ;

-- DELIMITER $$


-- CREATE PROCEDURE RegisterUser(
--     IN p_email VARCHAR(255),
--     IN p_password VARCHAR(255),
--     IN p_role_id INT,
--     IN p_state_id INT,
--     IN p_region_id INT
-- )
-- BEGIN
--     DECLARE generated_uuid VARCHAR(10);
--     DECLARE salt VARCHAR(255);
--     DECLARE hashed_password VARCHAR(255);

--     -- Generate a 10-character unique ID
--     SET generated_uuid = LEFT(REPLACE(UUID(), '-', ''), 10);

--     -- Generate a random salt
--     SET salt = LEFT(UUID(), 16);

--     -- Hash the password with the generated salt
--     SET hashed_password = SHA2(CONCAT(p_password, salt), 256);

--     -- Insert into users table
--     INSERT INTO users (email, role_id, state_id, region_id, user_uuid)
--     VALUES (p_email, p_role_id, p_state_id, p_region_id, generated_uuid);

--     -- Insert into passwords table using auto-increment user_id
--     INSERT INTO passwords (user_id, password, salt)
--     VALUES (LAST_INSERT_ID(), hashed_password, salt);
-- END$$

-- DELIMITER ;



-- DELIMITER $$

-- CREATE PROCEDURE LoginUser(
--     IN p_email VARCHAR(255),
--     IN p_password VARCHAR(255),
--     OUT p_is_valid BOOLEAN,
--     OUT p_user_id VARCHAR(10), -- Update to match the actual column length
--     OUT p_role_id INT
-- )
-- BEGIN
--     DECLARE stored_hash VARCHAR(255);
--     DECLARE stored_salt VARCHAR(255);

--     -- Initialize output variables
--     SET p_is_valid = FALSE;
--     SET p_user_id = NULL;
--     SET p_role_id = NULL;

--     -- Retrieve the stored password hash, salt, and role for the provided email
--     SELECT p.password, p.salt, u.user_id, u.role_id
--     INTO stored_hash, stored_salt, p_user_id, p_role_id
--     FROM users u
--     JOIN passwords p ON u.user_id = p.user_id
--     WHERE u.email = p_email;

--     -- Validate the provided password
--     IF SHA2(CONCAT(p_password, stored_salt), 256) = stored_hash THEN
--         SET p_is_valid = TRUE;
--     END IF;
-- END$$

-- DELIMITER ;


ALTER TABLE users MODIFY COLUMN user_id VARCHAR(16) NOT NULL;
ALTER TABLE passwords MODIFY COLUMN user_id VARCHAR(16) NOT NULL;


DELIMITER $$

CREATE PROCEDURE LoginUser(
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    OUT p_is_valid BOOLEAN,
    OUT p_user_id VARCHAR(16), -- Update to match the 16-character user_id length
    OUT p_role_id INT
)
BEGIN
    DECLARE stored_hash VARCHAR(255);
    DECLARE stored_salt VARCHAR(255);

    -- Initialize output variables
    SET p_is_valid = FALSE;
    SET p_user_id = NULL;
    SET p_role_id = NULL;

    -- Retrieve the stored password hash, salt, and role for the provided email
    SELECT p.password, p.salt, u.user_id, u.role_id
    INTO stored_hash, stored_salt, p_user_id, p_role_id
    FROM users u
    JOIN passwords p ON u.user_id = p.user_id
    WHERE u.email = p_email;

    -- Validate the provided password
    IF SHA2(CONCAT(p_password, stored_salt), 256) = stored_hash THEN
        SET p_is_valid = TRUE;
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE RegisterUser(
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_role_id INT,
    IN p_state_id INT,
    IN p_region_id INT
)
BEGIN
    DECLARE generated_user_id VARCHAR(16); -- Declare a 16-character user ID
    DECLARE salt VARCHAR(255);
    DECLARE hashed_password VARCHAR(255);

    -- Generate a 16-character unique user ID
    SET generated_user_id = LEFT(REPLACE(UUID(), '-', ''), 16);

    -- Generate a random salt
    SET salt = LEFT(UUID(), 16);

    -- Hash the password with the generated salt
    SET hashed_password = SHA2(CONCAT(p_password, salt), 256);

    -- Insert into users table
    INSERT INTO users (user_id, email, role_id, state_id, region_id)
    VALUES (generated_user_id, p_email, p_role_id, p_state_id, p_region_id);

    -- Insert into passwords table
    INSERT INTO passwords (user_id, password, salt)
    VALUES (generated_user_id, hashed_password, salt);
END$$

DELIMITER ;





