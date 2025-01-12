const express = require('express');
const { addState,viewStates,removeState,editState } = require('../controllers/stateController');
const router = express.Router();
const authenticate=require('../middleware/authMiddleware');
const authorize=require('../middleware/roleMiddleware')

router.post('/add',authenticate,authorize([1]), addState);
router.get('/view',authenticate,authorize([1]), viewStates);
router.delete('/remove',authenticate,authorize([1]), removeState);
router.put('/edit',authenticate,authorize([1]), editState);


module.exports = router;
