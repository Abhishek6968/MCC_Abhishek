const pool = require('../config/db');

const addState = async (req, res) => {
    const { name } = req.body;

    try {
        await pool.query('CALL AddState(?)', [name]);
        res.status(201).send({ message: 'State added successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// View all states
const viewStates = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL ViewStates()');
        res.status(200).send(rows[0]); // Send the list of states
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Remove a state
const removeState = async (req, res) => {
    const { state_id } = req.body;

    try {
        await pool.query('CALL RemoveState(?)', [state_id]);
        res.status(200).send({ message: 'State removed successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const editState = async (req, res) => {
    const state_id = req.query.state_id || req.body.state_id; // Extract state_id from query or body
    const { state_name } = req.body; // Extract the new state name from the request body

    if (!state_id || !state_name) {
        return res.status(400).send({ error: 'state_id and state_name are required' });
    }

    try {
        // Call the stored procedure to update the state
        await pool.query('CALL EditState(?, ?)', [state_id, state_name]);
        res.status(200).send({ message: 'State updated successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


module.exports = { addState, viewStates, removeState, editState };
