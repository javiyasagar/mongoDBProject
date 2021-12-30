const express = require('express');
const router = express();
const userController = require('../controller/userController')
const { upload } = require("../services/multer");
const { generateToken, auth } = require('../middleware/auth')

//render: ejs page call
//redirect: calling api

router.get("/", userController.login)
router.post("/authLogin", generateToken, userController.authLogin)

router.get('/register', userController.register)
router.post("/authRegister", upload.single('Image'), userController.authRegister)

router.get("/forgetPassword", userController.forgetPassword);
router.post("/verifyEmail", userController.verifyEmail);

router.get("/otp", userController.otp);
router.post("/verifyOtp", userController.verifyOtp);

router.get("/newPassword", userController.newPassword);
router.post("/updatePassword", userController.updatePassword);

router.get("/resetPassword", auth, userController.resetPassword);
router.post("/resetPass", auth, userController.resetPass);

router.get("/index", auth, userController.index);

router.get("/viewProfile", auth, userController.viewProfile);

router.get("/showProfile", auth, userController.showProfile);
router.post("/updateProfile", auth, upload.single("Image"), userController.updateProfile);

router.get("/logout", auth, userController.logout);



module.exports = router;




