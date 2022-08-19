const jwt = require('jsonwebtoken');
const User = require("../models/userSchema");
const Note = require("../models/noteSchema");

const middleware = async(req, res, next) => {

    try {

        const token = req.cookies.jwtoken;
        const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);

        const result = await User.findOne({ _id: verifyToken._id, token });

        const userNotes = await Note.find({ user: verifyToken._id });

        if (!result) {
            throw new Error("Token Not Verified");
        }

        req._id = result._id;
        req.rootUser = result;
        req.name = result.name;
        req.userNote = userNotes;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid Token not verify" });
    }

}

module.exports = middleware;