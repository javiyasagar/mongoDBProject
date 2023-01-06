const express = require('express');
const router = express();
const contactuscontroller = require('../controller/contactusController');
const { auth } = require('../middleware/auth');

router.get('/contactus', auth, contactuscontroller.contactus);

router.get('/addcontactus', auth, contactuscontroller.addcontactus);
router.post('/api/contactus', auth, contactuscontroller.addDate);

router.get('/editcontactus/:id', auth, contactuscontroller.editcontactus);
router.post('/api/contactus/update/:id', auth, contactuscontroller.editData);

router.get('/api/contactus/delete/:id', auth, contactuscontroller.deleteData);
router.get('/api/contactus/delete', auth, contactuscontroller.deleteData00);


module.exports = router;