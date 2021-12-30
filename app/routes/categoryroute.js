const express = require('express');
const router = express();
const categorycontroller = require('../controller/categoryController');
const { auth } = require('../middleware/auth');

router.get('/category', auth, categorycontroller.category)

router.get('/addcategory', auth, categorycontroller.addcategory);
router.post('/api/category', auth, categorycontroller.adddate);

router.get('/editcategory/:id', auth, categorycontroller.editcategory);
router.post('/api/category/update/:id', auth, categorycontroller.editdata);

router.get('/api/category/delete/:id', auth, categorycontroller.deletedata)
router.get('/api/category/delete', auth, categorycontroller.deleteData)


module.exports = router;