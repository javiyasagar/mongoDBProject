const contactusmodel = require('../model/contactusmodel');
const { validationcontactus, validationcat12 } = require('../validation/contactusvalidation')

exports.contactus = async (req, res) => {
    const user = await contactusmodel.find()
    res.render('contactus', {
        values: user
    })
}

exports.addcontactus = async (req, res) => {
    res.render('addcontactus', {
        values: req.body
    })
}
exports.addDate = async (req, res) => {
    try {
        let { error } = validationcontactus(req.body);
        if (error) {
            if (error.details[0].context.key == 'name') {
                var err1 = error.details[0].message;
                return res.render('addcontactus', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                return res.render('addcontactus', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'massage') {
                var err1 = error.details[0].message;
                return res.render('addcontactus', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'phonenumber') {
                var err1 = error.details[0].message;
                return res.render('addcontactus', {
                    error4: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'date') {
                var err1 = error.details[0].message;
                return res.render('addcontactus', {
                    error5: err1,
                    values: req.body
                });
            }
        }
        else {
            const cou = {
                name: req.body.name,
                email: req.body.email,
                massage: req.body.massage,
                phonenumber: req.body.phonenumber,
                date: req.body.date
            }
            const data = new contactusmodel(cou);
            data.save()
                .then(US => {
                    res.redirect('/contactus')
                })
        }

    }
    catch (ex) {
        console.log(ex)
    }

}

exports.editcontactus = async (req, res) => {
    console.log(req.params.id);
    const user = await contactusmodel.findById(req.params.id)
    console.log(user);
    if (user) {
        res.render('editcontactus', {
            values: user
        })
    }

}

exports.editData = async (req, res) => {
    console.log(req.body);
    try {
        let { error } = validationcat12(req.body);
        console.log(error);
        if (error) {
            if (error.details[0].context.key == 'name') {
                var err1 = error.details[0].message;
                return res.render('editcontactus', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                return res.render('editcontactus', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'massage') {
                var err1 = error.details[0].message;
                return res.render('editcontactus', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'phonenumber') {
                var err1 = error.details[0].message;
                return res.render('editcontactus', {
                    error4: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'date') {
                var err1 = error.details[0].message;
                return res.render('editcontactus', {
                    error5: err1,
                    values: req.body
                });
            }

        }
        else {
            const result = await contactusmodel.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                email: req.body.email,
                massage: req.body.massage,
                phonenumber: req.body.phonenumber,
                date: req.body.date
            });
            if (result) {
                res.redirect('/contactus');
            }
        }
    }
    catch (ex) {
        console.log(ex)
    }
}

exports.deleteData = async (req, res) => {
    console.log(req.body);

    const result = await contactusmodel.findByIdAndDelete(req.params.id);
    if (result) {
        res.redirect('/contactus');
    }

}


exports.deleteData00 = async (req, res) => {
    var id = req.query;
    var count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {
        contactusmodel.findByIdAndDelete(Object.keys(id)[i], function (err) {
            if (err) {
                console.log('error is deleting task');
            }
        })
    }
    return res.redirect('/contactus')
}

