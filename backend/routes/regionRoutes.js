const express = require('express');
const { addRegion, viewRegions, deleteRegion, editRegion } = require('../controllers/regionController');
const router = express.Router();

router.post('/add', addRegion);
router.get('/view', viewRegions);
router.delete('/delete', deleteRegion);
router.put('/edit', editRegion);




module.exports = router;
