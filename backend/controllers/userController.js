const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const express = require('express');
require('dotenv').config();


// Register a user
const registerUser = async (req, res) => {
    const { email, password, role_id, state_id = null, region_id = null } = req.body;

    try {
        // Call the stored procedure to register the user
        await pool.query('CALL RegisterUser(?, ?, ?, ?, ?)', [
            email,
            password,
            role_id,
            state_id || null,
            region_id || null
        ]);

        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: 'An error occurred while registering the user.' });
    }
};

// Login a user
const loginUser=async (req, res) => {
    const { email, password } = req.body;

    try {
        // Call the stored procedure
        await pool.query('CALL LoginUser(?, ?, @is_valid, @user_id, @role_id);', [email, password]);

        // Retrieve the output variables
        const [result] = await pool.query('SELECT @is_valid AS is_valid, @user_id AS user_id, @role_id AS role_id;');
        const { is_valid, user_id, role_id } = result[0];

        if (!is_valid) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ email, user_id, role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).send({
            message: 'Login successful',
            token,
            user: {
                user_id,
                role_id,
                email
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: 'An error occurred while logging in.' });
    }
};

module.exports = { registerUser,loginUser };
