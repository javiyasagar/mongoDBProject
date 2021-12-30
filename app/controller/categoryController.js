const categorymodel = require('../model/categorymodel');
const { validationcategory, validationcat, } = require('../validation/categoryvalidation')

exports.category = async (req, res) => {
    const user = await categorymodel.find()
    res.render('category', {
        values: user
    })
}

exports.addcategory = async (req, res) => {
    res.render('addcategory')
}


exports.adddate = async (req, res) => {
    try {
        let { error } = validationcategory(req.body);
        if (error) {
            if (error.details[0].context.key == 'name') {
                var err1 = error.details[0].message;
                return res.render('addcategory', {
                    values: req.body
                });
            }
        }
        else {
            const cou = {
                name: req.body.name
            }
            const data = new categorymodel(cou);
            data.save()
                .then(US => {
                    res.redirect('/category')
                })
        }

    }
    catch (ex) {
        console.log(ex)
    }

}

exports.editcategory = async (req, res) => {
    console.log(req.params.id);
    const user = await categorymodel.findById(req.params.id)
    console.log(user);
    if (user) {
        res.render('editcategory', {
            values: user
        })
    }

}

exports.editdata = async (req, res) => {
    console.log(req.body);
    try {
        let { error } = validationcat(req.body);
        console.log(error);
        if (error) {
            if (error.details[0].context.key == 'name') {
                var err1 = error.details[0].message;
                return res.render('editcategory', {
                    error1: err1,
                    values: req.body
                });
            }
        }
        else {
            const result = await categorymodel.findByIdAndUpdate(req.params.id, {
                name: req.body.name
            });
            if (result) {
                res.redirect('/category');
            }
        }
    }
    catch (ex) {
        console.log(ex)
    }
}

exports.deletedata = async (req, res) => {
    console.log(req.body);

    const result = await categorymodel.findByIdAndDelete(req.params.id);
    if (result) {
        res.redirect('/category');
    }

}

exports.deleteData = async (req, res) => {
    var id = req.query;
    var count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {
        categorymodel.findByIdAndDelete(Object.keys(id)[i], function (err) {
            if (err) {
                console.log('error is deleting task');
            }
        })
    }
    return res.redirect('/category')
}







