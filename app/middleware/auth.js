const jwt = require('jsonwebtoken');
const config = require('config');

const generateToken = (req, res, next) => {
    const token = jwt.sign({ email: req.body.email }, config.get('jwtPrivateKey'));
    //cookie store in key value pair
    res.cookie("jwt", token)
    next();
};

const auth = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token == undefined) {
            res.redirect('/');
        }
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        console.log(decoded)
        req.user = decoded;
        next();

    }
    catch (ex) {
        console.log(ex)
        res.redirect('/');
    }


}


module.exports = {
    generateToken,
    auth
}
