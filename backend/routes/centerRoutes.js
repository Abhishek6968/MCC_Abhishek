const express = require('express');
const { addCenter,viewUserCenters,editUserCenter,deleteUserCenter } = require('../controllers/centerController');
const router = express.Router();
const authenticate=require('../middleware/authMiddleware');


router.post('/add',authenticate, addCenter);
router.get('/view',authenticate, viewUserCenters);
router.put('/edit/:id',authenticate, editUserCenter);
router.delete('/delete/:id',authenticate, deleteUserCenter);




module.exports = router;
