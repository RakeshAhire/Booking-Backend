const { UserModel } = require("../models/user.model");


//UPDATE
const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const updateUser = await UserModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
        res.status(200).json(updateUser)
    }
    catch (err) {
        next(err)
    }
}

//DELETE
const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        await UserModel.findByIdAndDelete(id);
        res.status(200).json("User has been deleted.")
    }
    catch (err) {
        next(err)
    }
}

//GET
const getUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await UserModeL.findById(id);
        res.status(200).json(user)
    }
    catch (err) {
        next(err)
    }
}

//GET ALL
const getAllUser = async (req, res, next) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users)
    }
    catch (err) {
        // res.status(500).json(err)
        next(err)
    }
}
module.exports = { updateUser, deleteUser, getUser, getAllUser }