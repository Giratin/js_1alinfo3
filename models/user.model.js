const mongoose = require("mongoose");


const userSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: {
            type: String
        },
        email: {
            type: String,
            unique: true,
            lowercase: true, //transform string to lowercase
            trim: true //remove blank spaces
        },
        age: {
            type: Number,
            required: true
        },
        dateInscription: {
            type: Date,
            default: new Date()
        }
    },
    {
        timestamps: true // add two key createAt and updatedAt
    }
);

// const example = {
//     firstName: "John",
//     lastName: "Doe",
//     email: "john.doe@esprit.tn",
//     age: 21,
//     dateInscription: new Date(),
//     _id: ObjectId("2345678966789"),
//     __v: 0, //Document version
//     createdAt: new Date(),
//     updatedAt: new Date()
// }
//"  Yassine.sta@esprit.tn      "
//=> "yassine.sta@esprit.tn"

const User = mongoose.model('user', userSchema);

module.exports = { User }