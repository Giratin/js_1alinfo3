const express = require("express");
const router = express.Router();
const { showCreateProduct, createProduct, getOneById, deleteProduct, getAll } = require("../controllers/products.controller");
/**
 * @Path /products
 */

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, +(new Date()) + "-" + file.originalname);
    }
})

const upload = multer({ storage });

router.route("/add")
    .get(showCreateProduct)
    .post(upload.single('tumbnail'), createProduct)

router.get("/list/", getAll)
router.get("/details/:_id", getOneById)
router.get("/delete/:_id", deleteProduct)


module.exports = router;