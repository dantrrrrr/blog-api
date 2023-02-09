const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    //get token from cookie
    console.log({ "token": token })
    if (!token) {
        return res.status(401).json("You are not authenticated !");
    }
    return jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            return res.json({
                message: "Token is not valid !",
                success: false
            });
        }
        req.user = user;
        console.log({ "user": req.user });
        return next();
    })

}
const verifyUser = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json("you are not allowed to do that ! ")
        }
    })
}
const verifyAdmin = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json("you are not allowed to do that ! ")
        }
    })
}
module.exports = { verifyToken, verifyUser, verifyAdmin }