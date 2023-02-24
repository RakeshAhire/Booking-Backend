const { Router } = require("express");

const roomsRouter = Router();
roomsRouter.get("/", async (req, res) => {

    try {

    }
    catch (err) {
        res.status(500).err
    }

});
roomsRouter.get("/", (req, res) => {
    res.send("Rooms Router")
});

module.exports = { roomsRouter }