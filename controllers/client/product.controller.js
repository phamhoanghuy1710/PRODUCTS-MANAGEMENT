//[GET] /products

const Product = require("../../models/product.model");

module.exports.index = async (req,res)=>{
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({position:"desc"});
    products.forEach(item =>{
        item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(2);
    })
    res.render("client/pages/products/index",{
        pageTitle: "Danh sach san pham",
        products: products
    });
}

module.exports.detailItem = async (req,res)=>{
    try{
        find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
        const product = await Product.findOne(find);
        res.render("client/pages/products/detail",{
            pageTitle: "Chi tiet san pham",
            product: product
        });
    }
    catch(error){
        res.redirect("/products");
    }
}