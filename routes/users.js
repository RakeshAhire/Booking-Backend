const { Router } = require("express");
const { updateUser, deleteUser, getUser, getAllUser } = require("../controllers/user");

const usersRouter = Router();
//GET ALL USERS
usersRouter.get("/", getAllUser);

//UPDATE USER
usersRouter.put("/:id", updateUser);

// DELETE USER
usersRouter.delete("/:id", deleteUser);

//GET SINGLE USER
usersRouter.get("/:id", getUser);

module.exports = { usersRouter }