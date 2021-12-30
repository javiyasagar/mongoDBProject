const express = require('express');
const router = express();
const portfolleController = require('../controller/portfolleController');
const { auth } = require('../middleware/auth');
const { upload } = require("../services/multer");


router.get('/portfolle', auth, portfolleController.portfolle); //contactus

router.get('/addportfolle', auth, portfolleController.addportfolle);
router.post('/api/portfolle', auth, upload.array('projectImage', 5), portfolleController.addData1);

router.get('/editportfolle/:id', auth, portfolleController.editportfolle);
router.post('/api/portfolle/update/:id', auth, upload.array('projectImage', 5), portfolleController.editData1);

router.get('/api/portfolle/delete/:id', auth, portfolleController.deleteData1);
router.get('/api/portfolle/delete', auth, portfolleController.deleteData12)

module.exports = router;