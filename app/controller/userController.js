const user = require('../model/user');
const { validateUser, loginUsers, passwordValidat, otpValidate, newPasswordValidat, resetpValidat, profileValidate
} = require('../validation/userValidation');
const bcrypt = require('bcrypt');
const { sendOTP } = require('../services/mail');
const logger = require('../loggers/logger');
const saltRounds = 10

let otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
logger.info(otp);

exports.login = async (req, res) => {
    res.render('login', {
        values: req.body
    });
};

exports.register = async (req, res) => {
    res.render('registration', {
        values: req.body
    });
};

exports.authRegister = async (req, res) => {
    console.log("body", req.body);
    try {
        let { error } = validateUser(req.body);
        // console.log(error);

        if (error) {
            if (error.details[0].context.key == 'name') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error1: err1,
                    values: req.body
                });
            }

            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'phoneNo') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'gender') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error4: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'password') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error5: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'confirmPassword') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error6: err1,
                    values: req.body
                });
            }

            if (error.details[0].context.key == 'city') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error7: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'hobby') {
                var err1 = error.details[0].message;
                return res.render('registration', {
                    error8: err1,
                    values: req.body
                });
            }

        }

        if (!req.file) {
            return res.render('registration', {
                error9: 'Image can be empty',
                values: req.body
            });
        }
        else {
            const pg = await user.findOne({
                email: req.body.email
            })
            if (pg) {
                var err1 = 'user already register'
                return res.render('registration', {
                    error2: err1,
                    values: req.body
                });
            }

            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);

            const course = {
                name: req.body.name,
                email: req.body.email,
                phoneNo: req.body.phoneNo,
                gender: req.body.gender,
                password: req.body.password,
                Image: req.file.filename,
                city: req.body.city,
                hobby: req.body.hobby
            }

            const data = new user(course);
            data.save()
                .then(() => {
                    res.redirect('/')
                })

        }
    }
    catch (ex) {
        console.log(ex)
    }

};

exports.authLogin = async (req, res) => {
    try {
        let { error } = loginUsers(req.body);
        console.log(error);
        if (error) {

            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                return res.render('login', {
                    error1: err1,
                    values: req.body
                });
            }

            if (error.details[0].context.key == 'password') {
                var err1 = error.details[0].message;
                return res.render('login', {
                    error2: err1,
                    values: req.body
                });
            }
        }
        else {
            user.findOne({ email: req.body.email }, async (err, response) => {
                console.log(response);
                if (response == null) {
                    var err1 = "User not found";
                    return res.render('login', {
                        error: err1,
                        values: req.body
                    });

                } else {
                    const comparision = await bcrypt.compare(req.body.password, response.password);
                    console.log(comparision)
                    if (comparision) {
                        res.redirect('/index')
                    }
                    else {
                        var err1 = "Password is incorrect";
                        return res.render('login', {
                            error: err1,
                            values: req.body
                        });

                    }
                }
            })


        }

    }
    catch (ex) {
        console.log(ex)
    }
};

exports.forgetPassword = (req, res) => {
    return res.render('forgetPassword', {
        values: req.body
    });
};

exports.verifyEmail = async (req, res, next) => {
    console.log(req.body);
    try {

        let { error } = passwordValidat(req.body);
        console.log(error);
        if (error) {
            console.log(error);
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                return res.render('forgetPassword', {
                    error1: err1,
                    values: req.body
                });
            }
        }
        const value = await user.findOne({ email: req.body.email })
        if (value) {
            sendOTP(req.body.email, otp);
            res.render('otp', {
                email: req.body.email,
                values: req.body
            });
        }
        else {
            return res.render('forgetPassword', {
                error1: "This email is not registered",
                values: req.body
            });
        }
    }
    catch (ex) {
        console.log(ex)
    }
};

exports.otp = (req, res) => {
    res.render('otp')
};

exports.verifyOtp = async (req, res, next) => {

    try {
        let { error } = otpValidate(req.body);
        console.log(error);
        if (error) {
            console.log(error);
            if (error.details[0].context.key == 'otp') {
                var err1 = error.details[0].message;
                return res.render('otp', {
                    error1: err1,
                    values: req.body
                });
            }
        }
        logger.info(req.body.otp)
        if (otp == req.body.otp) {
            return res.redirect("/newPassword");

        } else {
            var err1 = "Please enter correct OTP";
            return res.render('otp', {
                error1: err1,
                values: req.body
            });
        }
    }
    catch (err) {
        logger.error("err", err)
        // next(new GeneralError("reset password failed"));
    }
};

exports.newPassword = (req, res) => {
    res.render('UpdatePassword', {
        values: req.body
    });
};

exports.updatePassword = async (req, res, next) => {
    try {
        console.log(req.body)
        let { error } = newPasswordValidat(req.body);
        console.log(error);
        if (error) {

            if (error.details[0].context.key == 'password') {
                var err1 = error.details[0].message;
                return res.render('UpdatePassword', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'confirmPassword') {
                var err1 = error.details[0].message;
                return res.render('UpdatePassword', {
                    error2: err1,
                    values: req.body
                });
            }
        }

        const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const updatePassword = { password: encryptedPassword };
        user.updateOne({ otp: otp }, updatePassword, async (err, response) => {
            logger.info(response)
            if (err) throw err;

            res.redirect('/')

        })

    }
    catch (err) {
        logger.error("err", err)
        // next(new GeneralError("user registration failed"));
    }
};

exports.index = (req, res) => {
    res.render('index')
};

exports.resetPassword = (req, res) => {
    res.render('reset', {
        values: req.body
    })

};

exports.resetPass = async (req, res) => {
    try {
        console.log(req.body)
        let { error } = resetpValidat(req.body);
        console.log(error);
        if (error) {
            if (error.details[0].context.key == 'currentPassword') {
                var err1 = error.details[0].message;
                return res.render('reset', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'password') {
                var err1 = error.details[0].message;
                return res.render('reset', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'confirmPassword') {
                var err1 = error.details[0].message;
                return res.render('reset', {
                    error3: err1,
                    values: req.body
                });
            }
        }
        const Email = req.user.email;
        console.log(Email)
        const userValue = await user.findOne({ email: Email });
        console.log(req.body.confirmPassword);
        if (userValue) {
            const passwordValid = await bcrypt.compare(req.body.currentPassword, userValue.password);
            console.log(passwordValid);
            if (passwordValid) {

                const salt = 10;
                const bcryptPassword = await bcrypt.hash(req.body.password, salt);
                console.log("error", bcryptPassword);

                const passwordUpdate = { password: bcryptPassword };
                console.log("newpass", passwordUpdate);

                user.updateOne({ email: Email }, passwordUpdate, async (err, response) => {
                    if (response) {
                        console.log("response", response);
                        res.redirect('/')
                    } else {
                        console.log(err);
                    }
                })
            } else {
                return res.render('resetPassword', {
                    error: "Current Password is incorrect",
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
};

exports.viewProfile = async (req, res) => {
    const Email = req.user.email;
    console.log(Email)
    try {
        const userValue = await user.findOne({ email: Email })
        console.log(userValue)
        if (userValue) {
            res.render('viewProfile', {
                values: userValue
            });
        }
    } catch (err) {
        console.log(err)
    }
};

exports.showProfile = async (req, res) => {
    const Email = req.user.email;
    try {
        const userValue = await user.findOne({ email: Email })
        if (userValue) {
            res.render('editprofile', {
                values: userValue
            });
        }
    } catch (err) {
        console.log(err)
    }
};

exports.updateProfile = async (req, res) => {
    try {
        console.log(req.body, req.file)
        let { error } = profileValidate(req.body);
        console.log(error)
        if (error) {

            if (error.details[0].context.key == 'name') {
                var err1 = error.details[0].message;
                return res.render('editprofile', {
                    error1: err1,
                    values: req.body
                });
            }

            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                return res.render('editprofile', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'phoneNo') {
                var err1 = error.details[0].message;
                return res.render('editprofile', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'gender') {
                var err1 = error.details[0].message;
                return res.render('editprofile', {
                    error4: err1,
                    values: req.body
                });
            }

            if (error.details[0].context.key == 'city') {
                var err1 = error.details[0].message;
                return res.render('editprofile', {
                    error5: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'hobby') {
                var err1 = error.details[0].message;
                return res.render('editprofile', {
                    error6: err1,
                    values: req.body
                });
            }

        }
        const email = req.user.email;
        const userData = {
            name: req.body.name,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            gender: req.body.gender,
            password: req.body.password,
            city: req.body.city,
            hobby: req.body.hobby
        }

        if (req.file) {
            userData.Image = req.file.filename
        }
        const userUpdate = await user.updateOne({ email }, userData)
        if (userUpdate) {
            res.redirect('/viewProfile')
        }
        else {
            return res.render('editprofile', {
                error: "user details updation failed",
                values: req.body
            });
        }
    }
    catch (err) {
        console.log(err);
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.clearCookie("id");
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};
