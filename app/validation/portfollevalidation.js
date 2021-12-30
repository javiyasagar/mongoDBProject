const Joi = require('@hapi/joi');

function validationportfolle(contactus771) {
    const schema = Joi.object({
        projectCategory: Joi.string().empty().required().messages({
            "string.base": `projectCategory should be a type of 'text'`,
            "string.empty": `projectCategory cannot be an empty field`,
            "any.required": `projectCategory is a required field`,
        }),
        projectName: Joi.string().empty().required().messages({
            "string.base": `projectName should be a type of 'text'`,
            "string.empty": `projectName cannot be an empty field`,
            "string.designation": `projectName format not valid`,
            "any.required": `projectName is a required field`,
        }),
        projectTitle: Joi.string().empty().required().messages({
            "string.base": `projectTitle should be a type of text`,
            "string.empty": 'projectTitle is not allowed to be empty',
            "string.required": `projectTitle is Required`,
        }),
        projectUrl: Joi.string().empty().required().messages({
            "string.base": `projectUrl should be a type of text`,
            "string.empty": 'projectUrl is not allowed to be empty',
            "string.required": `projectUrlis Required`,
        }),
        projectDate: Joi.string().empty().required().messages({
            "string.base": `projectDate should be a type of text`,
            "string.empty": 'projectDate is not allowed to be empty',
            "string.required": `projectDate is Required`,
        }),
        projectImage: Joi.optional()

    })
    return schema.validate(contactus771);
}

function validationcat1234(contactus101) {
    const schema = Joi.object({
        projectCategory: Joi.string().empty().required().messages({
            "string.base": `projectCategory should be a type of 'text'`,
            "string.empty": `projectCategory cannot be an empty field`,
            "any.required": `projectCategory is a required field`,
        }),
        projectName: Joi.string().empty().required().messages({
            "string.base": `projectName should be a type of 'text'`,
            "string.empty": `projectName cannot be an empty field`,
            "string.designation": `projectName format not valid`,
            "any.required": `projectName is a required field`,
        }),
        projectTitle: Joi.string().empty().required().messages({
            "string.base": `projectTitle should be a type of text`,
            "string.empty": 'projectTitle is not allowed to be empty',
            "string.required": `projectTitle is Required`,
        }),
        projectUrl: Joi.string().empty().required().messages({
            "string.base": `projectUrl should be a type of text`,
            "string.empty": 'projectUrl is not allowed to be empty',
            "string.required": `projectUrlis Required`,
        }),
        projectDate: Joi.string().empty().required().messages({
            "string.base": `projectDate should be a type of text`,
            "string.empty": 'projectDate is not allowed to be empty',
            "string.required": `projectDate is Required`,
        }),
        projectImage: Joi.optional(),

        img: Joi.optional()
    })
    return schema.validate(contactus101);
}


module.exports = {
    validationportfolle,
    validationcat1234
}