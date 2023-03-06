const { HotelModel } = require("../models/hotels.model");
const { RoomModel } = require("../models/rooms.model");

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
    // console.log('id: ', id);
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
    const { min, max, ...others } = req.query
    // console.log('req.query: ', req.query);
    try {
        const hotels = await HotelModel.find({
            ...others, cheapestPrice: {
                $gte: min || 1, $lte: max || 999999
            }
        }).limit(req.query.limit);
        res.status(200).json(hotels)
    }
    catch (err) {
        // res.status(500).json(err)
        next(err)
    }
}

//GET CITY NAME
const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    // console.log('cities: ', cities);
    try {
        const list = await Promise.all(cities.map(city => {
            return HotelModel.countDocuments({ city: city })
        }));
        res.status(200).json(list)
        // console.log('list: ', list);
    }
    catch (err) {
        // res.status(500).json(err)
        next(err)
    }
}
//GET BY TYPE
const countByType = async (req, res, next) => {
    try {
        const hotelCount = await HotelModel.countDocuments({ type: "hotel" })
        const apartmentCount = await HotelModel.countDocuments({ type: "apartment" })
        const resortCount = await HotelModel.countDocuments({ type: "resort" })
        const villaCount = await HotelModel.countDocuments({ type: "villa" })
        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
        ])
    }
    catch (err) {
        // res.status(500).json(err)
        next(err)
    }
}


const gethotelRooms = async (req, res, next) => {
    const {id} = req.params;
    try {
        const hotel = await HotelModel.findById(id);
        const list=await Promise.all(hotel.rooms.map(room=>{
            return RoomModel.findById(room)
        }))
        res.status(200).json(list)
    }
    catch (err) {
        next(err)
    }
}


module.exports = {
    createHotel, updateHotel, deleteHotel, getHotel, getAllHotel,
    countByCity, countByType,gethotelRooms
}