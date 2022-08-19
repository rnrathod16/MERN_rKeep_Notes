const jwt = require('jsonwebtoken');

const mid2 = (req, res, next) => {

    const token = req.cookies.jwtoken;
    req.token = token;
    next();


}

module.exports = mid2;