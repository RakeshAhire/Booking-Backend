const { Router } = require("express");
const { createHotel, updateHotel, deleteHotel, getHotel, getAllHotel } = require("../controllers/hotel");
const { verifyAdmin } = require("../utils/veifyToken");

const hotelsRouter = Router();

//CREATE
hotelsRouter.post("/",verifyAdmin ,createHotel);

//UPDATE
hotelsRouter.put("/:id",verifyAdmin, updateHotel);

//DELETE
hotelsRouter.delete("/:id",verifyAdmin, deleteHotel);

//GET
hotelsRouter.get("/:id", getHotel);

//GET ALL
hotelsRouter.get("/", getAllHotel);

module.exports = { hotelsRouter }