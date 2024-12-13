const express = require('express');
const { addState,viewStates,removeState,editState } = require('../controllers/stateController');
const router = express.Router();

router.post('/add', addState);
router.get('/view', viewStates);
router.delete('/remove', removeState);
router.put('/edit', editState);


module.exports = router;
