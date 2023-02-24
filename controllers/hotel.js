const { HotelModel } = require("../models/hotels.model");

//CREATE
const createHotel = async (req, res, next) => {
    const newHotel = new HotelModel(req.body);
    try {
        const saveHotel = await newHotel.save();
        res.status(200).json(saveHotel)
    }
    catch (err) {
        next(err)
    }
}

//UPDATE
const updateHotel = async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const updateHotel = await HotelModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
        res.status(200).json(updateHotel)
    }
    catch (err) {
        next(err)
    }
}

//DELETE
const deleteHotel = async (req, res, next) => {
    const { id } = req.params;
    try {
        await HotelModel.findByIdAndDelete(id);
        res.status(200).json("Hotel has been deleted.")
    }
    catch (err) {
        next(err)
    }
}

//GET
const getHotel = async (req, res, next) => {
    const { id } = req.params;
    try {
        const hotel = await HotelModel.findById(id);
        res.status(200).json(hotel)
    }
    catch (err) {
        next(err)
    }
}

//GET ALL
const getAllHotel = async (req, res, next) => {
    try {
        const hotels = await HotelModel.find();
        res.status(200).json(hotels)
    }
    catch (err) {
        // res.status(500).json(err)
        next(err)
    }
}
module.exports = { createHotel, updateHotel, deleteHotel, getHotel, getAllHotel }