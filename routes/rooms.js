const { Router } = require("express");
const { createRoom, updateRoom, deleteRoom, getRoom, getAllRoom } = require("../controllers/room");
const { verifyAdmin } = require("../utils/veifyToken");

const roomsRouter = Router();
//CREATE
roomsRouter.post("/:hotelid",verifyAdmin ,createRoom);

//UPDATE
roomsRouter.put("/:id",verifyAdmin, updateRoom);

//DELETE
roomsRouter.delete("/:id/:hotelid",verifyAdmin, deleteRoom);

//GET
roomsRouter.get("/:id", getRoom);

//GET ALL
roomsRouter.get("/", getAllRoom);


module.exports = { roomsRouter }