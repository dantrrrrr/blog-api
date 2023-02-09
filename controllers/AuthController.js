const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10;

class AuthController {
    // POST  /api/auth/register  
    async register(req, res) {
        try {
            const password = await bcrypt.hash(req.body.password, saltRounds);
            const data = {
                username: req.body.username,
                email: req.body.email,
                password: password
            }
            const newUser = await new User(data);
            const user = await newUser.save();
            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err)
        }
    }
    //POST api/auth/login
    async login(req, res) {
        try {
            const user = await User.findOne({username: req.body.username});
            if(user){
                const checkPassword = await bcrypt.compare(req.body.password,user.password);
                console.log("user login :",user.username, checkPassword)

                if(checkPassword){
                    const accessToken =  jwt.sign(
                        {id:user._id,isAdmin:user.isAdmin},
                        process.env.JWT_KEY,
                        {expiresIn: '3d'}
                    )
                    const {password,...others}=user._doc;
                    // res.status(201).json({...other,accessToken})
                    res.cookie("access_token",accessToken,{ httpOnly: true }).status(200).json(others); //save token to cookie

                }else{
                    res.status(403).json("Wrong password !")
                }
            }else{
                res.status(401).json("User not found !")
            }
        } catch (error) {
            res.status(500).json("Something went wrong: " + error)
        }
    }

}
module.exports = new AuthController;