const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
})

userSchema.pre('save', async function(next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }

        next();
    } catch (error) {
        console.log(error);
    }

})

userSchema.methods.generateAuthToken = async function(req, res, next) {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);

        this.token = token;

        await this.save();
        return token;

    } catch (err) {
        console.log(err);
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;