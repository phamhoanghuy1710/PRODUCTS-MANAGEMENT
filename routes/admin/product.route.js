const express = require("express");
const route = express.Router();
const multer = require("multer");
// const storageMulter = require("../../helpers/storageMulter");
const upload = multer();

const controller = require("../../controllers/admin/product.controller");
const productValidate = require("../../validates/admin/productValidate");
const uploadCloundMiddleware = require("../../middlewares/admin/uploadClound.middleware");

route.get("/",controller.index);
route.patch("/change-status/:status/:id",controller.changeStatus);
route.patch("/change-multi",controller.changeMulti);
route.delete("/delete/:id",controller.deleteItem);
route.get("/create",controller.createItem);
route.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloundMiddleware.upload,
    productValidate.createPost,
    controller.createItemPost);

route.get("/edit/:id",controller.editItem);

route.patch(
    "/edit/:id",
    upload.single('thumbnail'),
    uploadCloundMiddleware.upload,
    productValidate.createPost,
    controller.editPatch
);
route.get("/detail/:id",controller.detailItem);
module.exports = route;