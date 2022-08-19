const express = require('express');
const User = require('../models/userSchema');
const Note = require('../models/noteSchema');
const route = express.Router();
const bcrypt = require('bcryptjs');
const middleware = require("../middleware/middleware");
const mid2 = require('../middleware/mid2');

route.post('/signup', async(req, res) => {
    const { name, email, password } = req.body;

    try {

        if (!name || !email || !password) {
            return res.status(401).json({ message: "Enter all the Fields" });
        }

        const result = await User.findOne({ email });

        if (result) {
            return res.status(401).json({ message: "User Already Exists" });
        }

        const newUser = new User({ name, email, password });
        const data = await newUser.save();

        if (newUser) {
            return res.status(200).json({ message: "User Created" });

        } else {
            return res.status(401).json({ message: "User Not Created" });

        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})


route.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(401).json({ message: "Enter all the Fields" });
        }

        const result = await User.findOne({ email });

        if (result) {
            const verifyPass = await bcrypt.compare(password, result.password);

            if (verifyPass) {
                const token = await result.generateAuthToken();

                res.cookie('jwtoken', token, {
                    expires: new Date(Date.now() + 25852000),
                    httpOnly: true
                })

                return res.status(200).json({ message: "User Signed in" });
            } else {
                return res.status(401).json({ message: "Invalid Credentials" });
            }
        }

        return res.status(401).json({ message: "User Doesnt Exitsts" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

route.get("/about", middleware, (req, res) => {
    res.status(201).json(req.rootUser);
})

route.post('/ab', middleware, async(req, res) => {
    const user = req._id;
    const { title, description } = req.body;

    try {
        const result = new Note({ title, description, user });
        const data = await result.save();

        if (data) {
            return res.status(200).json({ message: "Note is inserted" });
        } else {
            return res.status(401).json({ message: "Note not inserted" });

        }

    } catch (error) {
        console.log(error);
    }
})

route.get("/ab", middleware, (req, res) => {
    // res.status(200).send(req.rootUser.name);
    res.status(200).json({ message: req._id, no: req.userNote, userName: req.name });

})

route.post("/deletenote", middleware, async(req, res) => {
    // res.status(200).send(req.rootUser.name);
    const idelete = req.body;
    try {
        const result = await Note.deleteOne({ _id: idelete });
        if (!result) {
            res.status(501);
        }
    } catch (error) {
        console.log(error);
    }

})


route.get("/logout", (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(201).json({ message: "User Logged Out" });
})


// route.get("/usernotes", (req, res) => {
//     // res.status(200).send(req.rootUser.name);
//     // res.status(200).json({ message: req._id });
//     const token = req.cookies.jwtoken;
//     res.status(200).json({ message: token });


// })
module.exports = route;