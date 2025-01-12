const express = require('express');
const { addRegion, viewRegions, deleteRegion, editRegion } = require('../controllers/regionController');
const router = express.Router();
const authenticate=require('../middleware/authMiddleware');

router.post('/add',authenticate, addRegion);
router.get('/view',authenticate, viewRegions);
router.delete('/delete',authenticate, deleteRegion);
router.put('/edit',authenticate, editRegion);




module.exports = router;
