const jwt = require('jsonwebtoken');
const { createError } = require('./createError');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    // console.log('token: ', token);
    if (!token) {
        return next(createError(401, "You are not authenticated!"))
    }

    jwt.verify(token, 'shhhhh',  (err, user)=> {
        if (err) {
            return next(createError(403, "Token is not valid!"))
        }
            req.user = user;
            next()
        // console.log(user)
    });
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }
        else {
            return next(createError(403, "You are not authorized!"))
        }
    })
}
const verifyAdmin = (req, res,next ) => {
    // console.log("Entered")
    verifyToken(req, res,() => {
        // console.log('req: ', req.user);
        if (req.user.isAdmin) {
            // console.log('req.user.isAdmin: ', req.user.isAdmin);
            next()
        }
        else {
            return next(createError(403, "You are not authorized!"))
        }
    });
}


module.exports = { verifyToken, verifyUser, verifyAdmin }