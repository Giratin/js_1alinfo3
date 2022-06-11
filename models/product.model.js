const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        title: String,
        price: Number,
        description: String,
        image: String,
        stock: Number
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("product", productSchema);

module.exports = { Product };