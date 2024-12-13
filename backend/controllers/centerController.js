const pool = require('../config/db');

const addCenter = async (req, res) => {
    const { region_id, u_id, name, contact_no, email } = req.body;

    try {
        await pool.query('CALL AddCenter(?, ?, ?, ?, ?)', [region_id, u_id, name, contact_no, email]);
        res.status(201).send({ message: 'Center added successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// View user centers
const viewUserCenters = async (req, res) => {
    const { region_id } = req.query;

    try {
        const [rows] = await pool.query('CALL ViewUserCenters(?)', [region_id || null]);
        res.status(200).send(rows[0]); // Send the list of centers
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Edit user center by ID
const editUserCenter = async (req, res) => {
    const { id } = req.params;
    const {  name = null, contact_no = null, email = null } = req.body;

    if (!id) {
        return res.status(400).send({ error: 'id is required' });
    }

    try {
        // Call the updated stored procedure
        await pool.query('CALL EditUserCenterById(?, ?, ?, ?)', [id, name, contact_no, email]);
        res.status(200).send({ message: 'User center updated successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Delete user center by ID
const deleteUserCenter = async (req, res) => {
    const { id } = req.params; // Extract id from route parameters

    if (!id) {
        return res.status(400).send({ error: 'id is required' });
    }

    try {
        // Call the stored procedure
        await pool.query('CALL DeleteUserCenterById(?)', [id]);
        res.status(200).send({ message: 'User center deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { addCenter,viewUserCenters,editUserCenter,deleteUserCenter };
