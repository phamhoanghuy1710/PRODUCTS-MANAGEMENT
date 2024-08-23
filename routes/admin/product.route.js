const express = require("express");
const route = express.Router();
const multer = require("multer");
// const storageMulter = require("../../helpers/storageMulter");
const upload = multer();
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
// Configuration
cloudinary.config({ 
    cloud_name: 'dgmlgi7p4', 
    api_key: '628256499685731', 
    api_secret: 'uWiZf7yK-HjxcHpghszH8tzI2P0' // Click 'View API Keys' above to copy your API secret
});

const controller = require("../../controllers/admin/product.controller");
const productValidate = require("../../validates/admin/productValidate");

route.get("/",controller.index);
route.patch("/change-status/:status/:id",controller.changeStatus);
route.patch("/change-multi",controller.changeMulti);
route.delete("/delete/:id",controller.deleteItem);
route.get("/create",controller.createItem);
route.post(
    "/create",
    upload.single('thumbnail'),
    function (req, res, next) {
        if(req.file){
            let streamUpload = (req) => {
                return new Promise((resolve, reject) => {
                    let stream = cloudinary.uploader.upload_stream(
                      (error, result) => {
                        if (result) {
                          resolve(result);
                        } else {
                          reject(error);
                        }
                      }
                    );
        
                  streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };
        
            async function upload(req) {
                let result = await streamUpload(req);
                req.body[req.file.fieldname] = result.secure_url;
                next();
            }
        
            upload(req);
        }
        else{
            next();
        }
    },
    productValidate.createPost,
    controller.createItemPost);

route.get("/edit/:id",controller.editItem);

route.patch(
    "/edit/:id",
    upload.single('thumbnail'),
    function (req, res, next) {
        if(req.file){
            let streamUpload = (req) => {
                return new Promise((resolve, reject) => {
                    let stream = cloudinary.uploader.upload_stream(
                      (error, result) => {
                        if (result) {
                          resolve(result);
                        } else {
                          reject(error);
                        }
                      }
                    );
        
                  streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };
        
            async function upload(req) {
                let result = await streamUpload(req);
                req.body[req.file.fieldname] = result.secure_url;
                next();
            }
        
            upload(req);
        }
        else{
            next();
        }
    },
    productValidate.createPost,
    controller.editPatch
);
route.get("/detail/:id",controller.detailItem);
module.exports = route;