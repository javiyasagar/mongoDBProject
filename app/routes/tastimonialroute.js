const express = require('express');
const router = express();
const testimonialController = require('../controller/testimonialController');
const { auth } = require('../middleware/auth');
const { upload } = require("../services/multer");


router.get('/testimonial', auth, testimonialController.testimonial); //contactus

router.get('/addtestimonial', auth, testimonialController.addtestimonial);
router.post('/api/testimonial', auth, upload.single('image'), testimonialController.addDat);

router.get('/edittestimonial/:id', auth, testimonialController.edittestimonial);
router.post('/api/testimonial/update/:id', auth, upload.single('image'), testimonialController.editDat);

router.get('/api/testimonial/delete/:id', auth, testimonialController.deleteDat);
router.get('/api/testimonial/delete', auth, testimonialController.deleteData001);


module.exports = router;