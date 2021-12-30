const testimonialrmodel = require('../model/testimonialmodel');
const { validationtestimonial, validationcat123 } = require('../validation/testimonialvalidation')

exports.testimonial = async (req, res) => {
    const user = await testimonialrmodel.find()
    res.render('testimonial', {
        values: user
    })
}

exports.addtestimonial = async (req, res) => {
    res.render('addtestimonial', {
        values: req.body
    })
}


exports.addDat = async (req, res) => {
    console.log(req.body, req.file);
    try {
        let { error } = validationtestimonial(req.body);
        if (error) {
            console.log(error);
            if (error.details[0].context.key == 'testimonialName') {
                var err1 = error.details[0].message;
                return res.render('addtestimonial', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'designation') {
                var err1 = error.details[0].message;
                return res.render('addtestimonial', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'description') {
                var err1 = error.details[0].message;
                return res.render('addtestimonial', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'image') {
                var err1 = error.details[0].message;
                return res.render('addtestimonial', {
                    error4: err1,
                    values: req.body
                });
            }
        }
        else {
            const cou = {
                testimonialName: req.body.testimonialName,
                designation: req.body.designation,
                description: req.body.description,
                image: req.file.filename,
            }
            const data = new testimonialrmodel(cou);
            data.save()
                .then(() => {
                    res.redirect('/testimonial')
                })
        }

    }
    catch (ex) {
        console.log(ex)
    }

}

exports.edittestimonial = async (req, res) => {
    console.log(req.params.id);
    const user = await testimonialrmodel.findById(req.params.id)
    console.log(user);
    if (user) {
        res.render('edittestimonial', {
            values: user
        })
    }

}

exports.editDat = async (req, res) => {
    console.log(req.body);
    try {
        let { error } = validationcat123(req.body);
        console.log(error);
        if (error) {
            if (error.details[0].context.key == 'testimonialName') {
                var err1 = error.details[0].message;
                return res.render('edittestimonial', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'designation') {
                var err1 = error.details[0].message;
                return res.render('edittestimonial', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'description') {
                var err1 = error.details[0].message;
                return res.render('edittestimonial', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'image') {
                var err1 = error.details[0].message;
                return res.render('edittestimonial', {
                    error4: err1,
                    values: req.body
                });
            }
        }
        else {
            const data = {
                testimonialName: req.body.testimonialName,
                designation: req.body.designation,
                description: req.body.description,
            }
            if (req.file) {
                data.image = req.file.filename
            }
            console.log(req.params.id);
            const result = await testimonialrmodel.findByIdAndUpdate(req.params.id, data)
            console.log("res", result);
            res.redirect('/testimonial')
        }
    }
    catch (ex) {
        console.log(ex)
    }
}

exports.deleteDat = async (req, res) => {
    console.log(req.body);

    const result = await testimonialrmodel.findByIdAndDelete(req.params.id);
    if (result) {
        res.redirect('/testimonial');
    }
}

exports.deleteData001 = async (req, res) => {
    var id = req.query;
    var count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {
        testimonialrmodel.findByIdAndDelete(Object.keys(id)[i], function (err) {
            if (err) {
                console.log('error is deleting task');
            }
        })
    }
    return res.redirect('/testimonial')
}

