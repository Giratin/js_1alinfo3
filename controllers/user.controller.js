const { default: mongoose } = require("mongoose");
const { User } = require("../models/user.model");

module.exports = {
    createUser: (req, res) => {
        //req.body
        const user = new User(req.body);

        if(req.file){
            user.image = req.file.filename;
        }
        user.save((error, doc) => {
            if (error) {
                return res.status(400).json({ error })
            }
            res.status(201).json(doc)
        })
    },
    getAllUsers: async (req, res) => {
        const users = await User.find();
        console.log(users);
        res.json(users);
    },
    getUserById: (req, res) => {
        const { _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('Id is not valid')
        }

        User.findById(_id)
            .then((doc) => {
                if (!doc) {
                    return res.status(404).send("User not found")
                }

                res.json(doc)
            }).catch((err) => {
                res.status(400).json(err)
            })
    },
    deleteUserById: (req, res) => {
        const { _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('Id is not valid')
        }

        User.findByIdAndRemove(_id, {}, (error, doc) => {
            if(error){
                return res.status(400).json(error)
            }
            if(!doc){
                return res.status(404).send("User not found")
            }
            return res.status(200).json(doc)
        })
    },
    getUserByName: async (req, res) => {
        //\?firstName=test&lastName=test
        const { firstName } = req.query;
        const user = await User.find({ firstName: firstName });
        res.json(user);
    }
}