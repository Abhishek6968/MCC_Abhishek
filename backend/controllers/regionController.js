const pool = require('../config/db');

const addRegion = async (req, res) => {
    const { state_id, region_name } = req.body;

    try {
        await pool.query('CALL AddRegion(?, ?)', [region_name, state_id]);
        res.status(201).send({ message: 'Region added successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// View regions, optionally filtered by state_id
const viewRegions = async (req, res) => {
    const { state_id } = req.query;

    try {
        const [rows] = await pool.query('CALL ViewRegions(?)', [state_id || null]);
        res.status(200).send(rows[0]); // Send the list of regions
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Delete a region
const deleteRegion = async (req, res) => {
    const { region_id } = req.query;

    try {
        await pool.query('CALL DeleteRegion(?)', [region_id]);
        res.status(200).send({ message: 'Region deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Edit a region
const editRegion = async (req, res) => {
    const region_id = req.query.region_id; // Extract region_id from query parameters
    const { region_name } = req.body; // Extract the new region name from the request body

    if (!region_id || !region_name) {
        return res.status(400).send({ error: 'region_id and region_name are required' });
    }

    try {
        // Call the stored procedure to update the region
        await pool.query('CALL EditRegion(?, ?)', [region_id, region_name]);
        res.status(200).send({ message: 'Region updated successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { addRegion, viewRegions, deleteRegion, editRegion };
