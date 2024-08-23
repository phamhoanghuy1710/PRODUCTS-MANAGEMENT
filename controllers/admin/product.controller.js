//[GET] /admin/products

const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const search = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/systems");
module.exports.index = async (req,res)=>{
    // console.log(req.query.status);
    // doan code filterStatus
    const filterStatus = filterStatusHelper(req.query);
    const find = {
        deleted: false
    }

    if (req.query.status){
        find.status = req.query.status;
    }
    // end filterStatus

    // phan search
    const objectKeyword = searchHelper(req.query);
    if (objectKeyword.regex){
        find.title = objectKeyword.regex;
    }
    // end phan search

    //phan pagination
    const countProducts = await Product.countDocuments(find);
    const objectPagination = paginationHelper(
        {
            limitItems : 4,
            currentPage : 1
        },
        req.query,
        countProducts
    )
    //end pagination

    const products = await Product.find(find).sort({ position: "desc"}).limit(objectPagination.limitItems).skip(objectPagination.skip);


    res.render("admin/pages/products/index", {
        pageTitle: "Trang danh sach san pham",
        products: products,
        filterStatus: filterStatus,
        keyword: objectKeyword.keyword,
        pagination: objectPagination
    });
}

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req , res)=>{
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({_id:id},{status:status});
    req.flash("success","Cap nhat trang thai thanh cong"); // dung de hien thi thong bao
    res.redirect("back");
}
//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req,res)=>{
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch(type) {
        case "active":
            await Product.updateMany({_id:{$in:ids}}, {status:"active"});
            req.flash("success",`Cap nhat trang thai thanh cong cho ${ids.length} san pham`);
            break;
        case "inactive":
            await Product.updateMany({_id:{$in:ids}}, {status:"inactive"});
            req.flash("success",`Cap nhat trang thai thanh cong cho ${ids.length} san pham`);
            break;
        case "delete-all":
            await Product.updateMany({_id:{$in:ids}}, {deleted:true, deletedAt: new Date()});
            req.flash("success",`Xoa  thanh cong cho ${ids.length} san pham`);
            break;
        case "change-positon":
            for (item of ids){
                let [id,position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({_id:id},{position:position});
            }
            req.flash("success",`Thay doi vi tri thanh cong cho ${ids.length} san pham`);
            break;
        default:
            break;
    }
    res.redirect("back");
}

//[DELETE] /admin/products/delete
module.exports.deleteItem = async (req,res)=>{
    const id = req.params.id;
    // await Product.deleteOne({_id:id});
    await Product.updateOne({_id:id},{
        deleted:true,
        deletedAt: new Date()
    });
    req.flash("success",`Xoa  thanh cong  san pham`);
    res.redirect("back");
}

module.exports.createItem = (req,res)=>{
    res.render("admin/pages/products/create",{
        pageTitle: "Them moi mot san pham"
    })
}

module.exports.createItemPost = async (req,res)=>{
   
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if (req.body.position === ""){
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    }
    else {
        req.body.position = parseInt(req.body.position);
    }

    if (req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    const product = new Product(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

module.exports.editItem = async (req,res)=>{
    try{
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const products = await Product.findOne(find);
        res.render("admin/pages/products/edit",{
            pageTitle: "Chinh sua mot san pham",
            products: products
        });
    }
    catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}

module.exports.editPatch = async (req,res)=>{
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    
    if (req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    
    try{
        await Product.updateOne({_id:req.params.id},req.body);
        req.flash("success",`Chinh sua thanh cong`);
    }
    catch(error){
        req.flash("error",`Chinh sua that bai`);
    }
    res.redirect("back");
}

module.exports.detailItem = async (req,res)=>{
    try{
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const products = await Product.findOne(find);
        res.render("admin/pages/products/detail",{
            pageTitle: products.title,
            products: products
        });
    }
    catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}