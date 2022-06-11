const { Product } = require("../models/product.model");
const fs = require("fs")

module.exports = {
    getAll: (req, res) => {
        Product.find()
            .then(products => {
                res.render("list", { products });
            })
            .catch(err => {
                res.json(err);
            });
    },
    getOneById: (req, res) => {
        const { _id } = req.params;
        Product.findById(_id).then(product => {
            res.render("details", { product })
        }).catch(err => {
            res.json(err);
        });
    },
    showCreateProduct: (req, res) => {
        res.render("create")
    },
    createProduct: async (req, res) => {
        const product = new Product(req.body);
        if (req.file) {
            product.image = req.file.filename;
        }
        await product.save();
        res.redirect("/products/add");
    },
    deleteProduct: (req, res) => {
        const { _id } = req.params;
        Product.findByIdAndDelete(_id).then(
            (product) => {
                if(product.image){
                    fs.unlink(`./public/images/${product.image}`, (err) => {
                        console.log(err);
                    });
                }
                res.redirect("/products/list");
            }
        ).catch((err) => {
            res.redirect("/products/list");
        });
    }
}