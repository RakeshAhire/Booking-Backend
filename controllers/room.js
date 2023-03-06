const { HotelModel } = require("../models/hotels.model");
const { RoomModel } = require("../models/rooms.model");
const { createError } = require("../utils/createError");

const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new RoomModel(req.body);
    try {
        const saveRoom = await newRoom.save();
        await HotelModel.findByIdAndUpdate(
            hotelId,
            { $push: { rooms: saveRoom._id } }
        );
        res.status(200).json(saveRoom)
    }
    catch (err) {
        next(err)
    }
}

// update
const updateRoom = async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const updateRoom = await RoomModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
        res.status(200).json(updateRoom)
    }
    catch (err) {
        next(err)
    }
}

//selected rooms
const updateRoomAvailability = async (req, res, next) => {
    const { id } = req.params;
    const {dates} = req.body;
    try {
        await RoomModel.updateOne({"roomNumbers._id":id},
        {
            $push:{
                "roomNumbers.$.unavailableDates":dates
            }
        })
        res.status(200).json("Room Status has been updated!")
    }
    catch (err) {
        next(err)
    }
}

//DELETE
const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const { id } = req.params;
    try {
        await RoomModel.findByIdAndDelete(id);
        try {
            await HotelModel.findByIdAndUpdate(
                hotelId,
                { $pull: { rooms: id } }
            );
        } catch (error) {
            next(error)
        }
        res.status(200).json("Room has been deleted.")
    }
    catch (err) {
        next(err)
    }
}

//GET
const getRoom = async (req, res, next) => {
    const { id } = req.params;
    try {
        const room = await RoomModel.findById(id);
        res.status(200).json(room)
    }
    catch (err) {
        next(err)
    }
}

//GET ALL
const getAllRoom = async (req, res, next) => {
    try {
        const rooms = await RoomModel.find();
        res.status(200).json(rooms)
    }
    catch (err) {
        // res.status(500).json(err)
        next(err)
    }
}

module.exports = { createRoom, updateRoom, getAllRoom, getRoom, deleteRoom,
    updateRoomAvailability
}