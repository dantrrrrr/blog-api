
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Post = require('../models/Post');
const saltRounds = 10;

class UserController {
    // UPDATE /user/:id
    async update(req, res) {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, saltRounds);

        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updateUser);
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async delete(req, res) {
        if (req.params.id === req.body.userId) {
            try {
                const user = await User.findById(req.params.id);
                try {
                    await User.findByIdAndDelete(req.params.id)
                    await Post.deleteMany({ username: user.username })
                    res.status(200).json("user gone ")

                } catch (error) {
                    res.status(500).json("error");
                }

            } catch (error) {
                res.json(404).json("user not found");
            }
        } else {
            res.status(401).json("you can only delete yourself")
        }

    }
    //Get user/:id
    async getUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            const { password, ...others } = user._doc;
            res.status(200).json(others)

        } catch (error) {
            res.status(500).json(error);
        }
    }
    async something(req, res) {

    }
    async something(req, res) {

    }
}
module.exports = new UserController();