const { Router } = require("express");
const { createHotel, updateHotel, deleteHotel, getHotel, getAllHotel } = require("../controllers/hotel");

const hotelsRouter = Router();

//CREATE
hotelsRouter.post("/", createHotel);

//UPDATE
hotelsRouter.put("/:id", updateHotel);

//DELETE
hotelsRouter.delete("/:id", deleteHotel);

//GET
hotelsRouter.get("/:id", getHotel);

//GET ALL
hotelsRouter.get("/", getAllHotel);

module.exports = { hotelsRouter }