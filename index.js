const express = require('express');
const cors = require('cors');

const { connection } = require('./config/db');
const { AuthRouter } = require('./routes/auth');
const { hotelsRouter } = require('./routes/hotels');
const { roomsRouter } = require('./routes/rooms');
const { usersRouter } = require('./routes/users');
var cookieParser = require('cookie-parser');

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/auth", AuthRouter);
app.use("/hotels", hotelsRouter);
app.use("/users", usersRouter);
app.use("/rooms", roomsRouter);
//error hadnling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})

app.listen(8080, async () => {
    try {
        await connection;
        console.log("Connected to backend");
    }
    catch (error) {
        console.log("Not connected to backend");
    }
})