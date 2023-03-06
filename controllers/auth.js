const { UserModel } = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createError } = require("../utils/createError");

const register = async (req, res, next) => {
    const { username, email, password, isAdmin } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                next(err)
            }
            else {
                const newUser = new UserModel({
                    username,
                    email,
                    password: hash,
                    isAdmin
                });
                await newUser.save();
                res.status(200).send({ "username": username, "message": "User has been created!" })
            }
            // Store hash in your password DB.
        });
    }
    catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return next(createError(404, "User not found!"))
        }
        bcrypt.compare(password, user.password)
            .then((result) => {
                if (result) {
                    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'shhhhh');
                    const { password, isAdmin, ...otherDetails } = user._doc;
                    res
                        .cookie("access_token", token, {
                            httpOnly: true,
                        })
                        .status(200)
                        .send({ "user": { ...otherDetails,isAdmin }, "message": "Login Successfully!" })
                }
                else {
                    next(createError(400, "Wrong password or username!"))
                }
            })
    }
    catch (err) {
        next(err)
    }
}
module.exports = { register, login }