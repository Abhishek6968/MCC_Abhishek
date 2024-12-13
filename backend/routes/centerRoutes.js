const express = require('express');
const { addCenter,viewUserCenters,editUserCenter,deleteUserCenter } = require('../controllers/centerController');
const router = express.Router();

router.post('/add', addCenter);
router.get('/view', viewUserCenters);
router.put('/edit/:id', editUserCenter);
router.delete('/delete/:id', deleteUserCenter);




module.exports = router;
