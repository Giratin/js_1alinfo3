var express = require('express');
const userController = require('../controllers/user.controller');
var router = express.Router();

/**
 * @Path /users
*/


const multer = require("multer");

const storage = multer.diskStorage(
    {
        destination: (req, file, clb) => {
            clb(null, "./public/images");
        },
        filename: (req, file, clb) => {
            const newFileName = +(new Date()) + "_" + file.originalname;
            clb(null, newFileName);
        }
    }
)

const upload = multer({ storage })


const mongoose = require("mongoose");

const verifyObjectId =  (req,res,next) =>{
    const { _id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({
            message: "Could not be found !",
            reason: "Object Id is malformed"
        })
    }
    next();
}

router.get('/', userController.getAllUsers)
router.post('/', upload.single('avatar') ,userController.createUser)
router.get('/findUser', userController.getUserByName)
router.get('/:_id', verifyObjectId, userController.getUserById)
router.delete('/:_id',verifyObjectId, userController.deleteUserById)



module.exports = router;
