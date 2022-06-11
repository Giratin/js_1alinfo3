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
        },
        image: {
            type: String
        }
    },
    {
        timestamps: true // add two keys createAt and updatedAt
    }
);

userSchema.pre('save', function (next) {
    const user = this;
    console.log('applied');
    user.firstName = user.firstName + " applied via pre function"
    next();
});


userSchema.options.toJSON = {
    transform: function(doc, object, options) {
        object.id = object._id;
        delete object.__v;
        delete object._id;
        delete object.createdAt;
        delete object.updatedAt;
        return object;
    }
};



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