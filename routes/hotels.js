const { Router } = require("express");
const { createHotel, updateHotel, deleteHotel, getHotel, getAllHotel, countByCity, countByType } = require("../controllers/hotel");
const { verifyAdmin } = require("../utils/veifyToken");

const hotelsRouter = Router();

//CREATE
hotelsRouter.post("/",verifyAdmin ,createHotel);

//UPDATE
hotelsRouter.put("/:id",verifyAdmin, updateHotel);

//DELETE
hotelsRouter.delete("/:id",verifyAdmin, deleteHotel);

//GET
hotelsRouter.get("/find/:id", getHotel);

//GET ALL
hotelsRouter.get("/", getAllHotel);
hotelsRouter.get("/countByCity", countByCity);
hotelsRouter.get("/countByType", countByType);

module.exports = { hotelsRouter }