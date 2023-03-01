const { Router } = require("express");
const { updateUser, deleteUser, getUser, getAllUser } = require("../controllers/user");
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/veifyToken");

const usersRouter = Router();

// usersRouter.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("You are logged in")
// })

// usersRouter.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("You are logged in and you are delete your account!")
// })

// usersRouter.get("/checkAdmin/:id",verifyAdmin , (req, res, next) => {
//     res.send("You are logged in and you are a Admin!")
// })

//GET ALL USERS
usersRouter.get("/", verifyAdmin, getAllUser);

//UPDATE USER
usersRouter.put("/:id", verifyUser, updateUser);

// DELETE USER
usersRouter.delete("/:id", verifyUser, deleteUser);

//GET SINGLE USER
usersRouter.get("/:id", verifyUser, getUser);

module.exports = { usersRouter }