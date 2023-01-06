const portfollemodel = require('../model/portfollemodel');
const { validationportfolle, validationcat1234 } = require('../validation/portfollevalidation')
const categorymodel = require('../model/categorymodel');

exports.portfolle = async (req, res) => {
    const user = await portfollemodel.aggregate([
        {
            $lookup:
            {
                from: 'categories',
                localField: 'name',
                foreignField: 'projectCategory',
                as: 'orderdetails'
            }
        },
        // { $unwind: 'orderdetails' }
    ]);
    console.log(user);
    res.render('portfolle', {
        values: user
    })
}
exports.addportfolle = async (req, res) => {
    console.log(req.body.name);
    try {
        const user = await categorymodel.find()
        console.log(user);
        if (user) {
            res.render('addportfolle', {
                values: user
            })
        }
    }
    catch (err) {
        console.log(err);

    }
}
exports.addData1 = async (req, res) => {
    console.log("res", req.body);
    try {
        let { error } = validationportfolle(req.body);
        if (error) {
            console.log(error);
            if (error.details[0].context.key == 'projectCategory') {
                var err1 = error.details[0].message;
                return res.render('addportfolle', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'projectName') {
                var err1 = error.details[0].message;
                return res.render('addportfolle', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'projectTitle') {
                var err1 = error.details[0].message;
                return res.render('addportfolle', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'projectUrl') {
                var err1 = error.details[0].message;
                return res.render('addportfolle', {
                    error4: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'projectDate') {
                var err1 = error.details[0].message;
                return res.render('addportfolle', {
                    error5: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'projectImage') {
                var err1 = error.details[0].message;
                return res.render('addportfolle', {
                    error5: err1,
                    values: req.body
                });
            }

        }
        else {
            const cor = req.files.map(x => x.filename);
            const cou = {
                projectCategory: req.body.projectCategory,
                projectName: req.body.projectName,
                projectTitle: req.body.projectTitle,
                projectUrl: req.body.projectUrl,
                projectDate: req.body.projectDate,
                projectImage: cor,
            }
            const data = new portfollemodel(cou);
            data.save()
                .then(() => {
                    res.redirect('/portfolle')
                })
        }
    }
    catch (ex) {
        console.log(ex)
    }
}
exports.editportfolle = async (req, res) => {
    console.log(req.body.name);
    try {
        const categoryuser = await categorymodel.find()
        const user = await portfollemodel.findById(req.params.id)
        console.log(user);
        if (user && categoryuser) {
            res.render('editportfolle', {
                values: user,
                categoryvalues: categoryuser
            })
        }
    }
    catch (err) {
        console.log(err);

    }
}
exports.editData1 = async (req, res) => {
    console.log("abc", req.body, req.files);
    try {
        let { error } = validationcat1234(req.body);
        console.log(error);
        if (error) {
            console.log(error);
            if (error.details[0].context.key == 'projectCategory') {
                var err1 = error.details[0].message;
                return res.render('editportfolle', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'projectName') {
                var err1 = error.details[0].message;
                return res.render('editportfolle', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'projectTitle') {
                var err1 = error.details[0].message;
                return res.render('editportfolle', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'projectUrl') {
                var err1 = error.details[0].message;
                return res.render('editportfolle', {
                    error4: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'projectDate') {
                var err1 = error.details[0].message;
                return res.render('editportfolle', {
                    error5: err1,
                    values: req.body
                });
            }

        }
        else {
            const result = {
                projectCategory: req.body.projectCategory,
                projectName: req.body.projectName,
                projectTitle: req.body.projectTitle,
                projectUrl: req.body.projectUrl,
                projectDate: req.body.projectDate,
            }
            if (req.files) {
                result.projectImage = req.files.map(x => x.filename)
            }
            else {
                result.projectImage = req.body.img
            }

            console.log(result);
            const abc = await portfollemodel.findByIdAndUpdate(req.params.id, result)
            res.redirect('/portfolle');
        }
    }
    catch (ex) {
        console.log(ex)
    }
}
exports.deleteData1 = async (req, res) => {
    console.log(req.body);

    const result = await portfollemodel.findByIdAndDelete(req.params.id);
    if (result) {
        res.redirect('/portfolle');
    }

}

exports.deleteData12 = async (req, res) => {
    var id = req.query;
    var count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {
        portfollemodel.findByIdAndDelete(Object.keys(id)[i], function (err) {
            if (err) {
                console.log('error is deleting task');
            }
        })
    }
    return res.redirect('/portfolle')
}





